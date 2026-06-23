import { prisma } from '../lib/prisma';
import * as fs from 'fs';
import * as path from 'path';

const CSV_DIR = '/home/davidprz/projects/CaloriesTracker/foods_fdc';

interface ComidaRow {
  id: string;
  name: string;
  nameES: string;
  categoriaId: string;
  medidaId: string;
}

async function readCSV(filename: string): Promise<ComidaRow[]> {
  const filePath = path.join(CSV_DIR, filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');
  
  const rows: ComidaRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row: any = {};
    headers.forEach((header, index) => {
      row[header.trim()] = values[index]?.trim().replace(/^"|"$/g, '') || '';
    });
    rows.push(row as ComidaRow);
  }
  return rows;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

async function main() {
  console.log('Starting to populate Comida table...');

  const csvFiles = [
    'beverages.csv',
    'cereals_and_grains.csv',
    'condiments_and_spices.csv',
    'dairy.csv',
    'eggs.csv',
    'fats_and_oils.csv',
    'fish_and_seafood.csv',
    'fruits_fdc.csv',
    'legumes.csv',
    'meats.csv',
    'nuts_and_seeds.csv',
    'snacks_fdc.csv',
    'vegetables.csv',
  ];

  let totalCreated = 0;

  for (const file of csvFiles) {
    console.log(`Processing ${file}...`);
    const rows = await readCSV(file);
    
    for (const row of rows) {
      const fdcId = parseInt(row.id, 10);
      const categoriaId = parseInt(row.categoriaId, 10);
      const medidaId = parseInt(row.medidaId, 10);
      
      if (isNaN(fdcId) || isNaN(categoriaId) || isNaN(medidaId)) {
        console.warn(`Skipping invalid row: ${JSON.stringify(row)}`);
        continue;
      }

      await prisma.comida.create({
        data: {
          FDCID: fdcId,
          nameES: row.nameES,
          nameEN: row.name,
          categoriaId: categoriaId,
          medidaId: medidaId,
        },
      });
      totalCreated++;
    }
    console.log(`Created ${rows.length} comida records from ${file}`);
  }

  console.log(`Comida table populated successfully! Total: ${totalCreated} records`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
