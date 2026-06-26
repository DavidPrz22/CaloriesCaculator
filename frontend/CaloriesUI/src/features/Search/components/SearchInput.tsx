import { SearchField } from "./SearchField";
import { CategorySelect } from "./CategorySelect";

interface SearchInputProps {
  query: string;
  setQuery: (val: string) => void;
  categoryId: string;
  setCategoryId: (val: string) => void;
}

export function SearchInput({ query, setQuery, categoryId, setCategoryId }: SearchInputProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <SearchField query={query} setQuery={setQuery} />
      <CategorySelect categoryId={categoryId} setCategoryId={setCategoryId} />
    </div>
  );
}
