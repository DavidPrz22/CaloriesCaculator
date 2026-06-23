import urllib.request
import json
import csv
import os
import time
import re
import sys

def main():
    if len(sys.argv) < 3:
        print("Usage: python fetch_fdc_ids.py <input_md_file> <output_csv_file>")
        sys.exit(1)
        
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    output_dir = os.path.dirname(output_file)
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)
    
    # Extract foods
    input_foods = []
    with open(input_file, 'r', encoding='utf-8') as f:
        for line in f:
            match = re.match(r'^\s*-\s+(.+)$', line)
            if match:
                food_item = match.group(1).strip()
                input_foods.append(food_item)

    print(f"Found {len(input_foods)} items to query.")
    
    results = []
    # To keep track of exact fdcIds so we don't duplicate
    seen_ids = set()
    
    # Query FDC internal endpoint
    url = "https://fdc.nal.usda.gov/portal-data/external/search"
    
    for food_item in input_foods:
        print(f"Querying: {food_item}")
        data = {
            "includeDataTypes": {
                "Survey (FNDDS)": True,
                "Foundation": True,
                "Branded": False, # Exclude branded to get generic items and save space/noise
                "SR Legacy": True
            },
            "referenceFoodsCheckBox": True,
            "requireAllWords": True,
            "sortCriteria": {"sortColumn": "description", "sortDirection": "asc"},
            "generalSearchInput": food_item,
            "pageNumber": 1
        }
        
        req = urllib.request.Request(
            url, 
            data=json.dumps(data).encode('utf-8'), 
            headers={'Content-Type': 'application/json'}
        )
        
        try:
            res = urllib.request.urlopen(req)
            response_data = json.loads(res.read())
            foods = response_data.get("foods", [])
            
            # Take top 3 results per fruit
            for food in foods[:3]:
                fdc_id = food.get("fdcId")
                if fdc_id not in seen_ids:
                    seen_ids.add(fdc_id)
                    results.append({
                        "id": fdc_id,
                        "name": food.get("description"),
                        "category": food.get("dataType")
                    })
        except Exception as e:
            print(f"Error querying {food_item}: {e}")
            
        # polite delay
        time.sleep(0.5)

    print(f"Writing {len(results)} results to {output_file}")
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['id', 'name', 'category']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for row in results:
            writer.writerow(row)
            
if __name__ == '__main__':
    main()
