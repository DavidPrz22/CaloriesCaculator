#### Create a new feature called Consumption.

- Make a page for consumption records based on the models `DataConsumo` and `DataConsumoDetalle` from the database. 
Schema files:
- `\\wsl.localhost\Ubuntu\home\davidprz\projects\CaloriesTracker\backend\CaloriesTrackerBackend\prisma\schema\dataconsumo.prisma`
- `\\wsl.localhost\Ubuntu\home\davidprz\projects\CaloriesTracker\backend\CaloriesTrackerBackend\prisma\schema\dataconsumodetalle.prisma`

**Frontend**

1. This feature should allow reading and deleting consumption records (`DataConsumo`).
2. Allow users to select a date range to filter the consumption records.
3. Show all `DataConsumo` records in a table view, with the columns: "Fecha y Hora" (`timestamp`), "Calorias Totales", "Proteinas Totales", "Carbohidratos Totales", "Grasas Totales". 
4. Add pagination (show 50 items per page).
5. Support i18n: Make it available in Spanish and English depending on the user's selected language in the store/app.
6. Make it look good and modern, using the same visual style as the project.
7. Use the current UI components of the project. Reference: `\\wsl.localhost\Ubuntu\home\davidprz\projects\CaloriesTracker\frontend\CaloriesUI\src\pages\history.tsx`
8. Implement a modal component to show detail data of a consumption record when clicked. The modal should fetch and list the `DataConsumoDetalle` items for that record, including the food name (`Comida.nameES` / `nameEN`), quantity consumed, and the specific macros for each item. Specify that data is based on 100 g or ml depending on the food type.
9. Use React Query to fetch and cache the detail data by `id`.
10. Define TypeScript types and Zod validation schemas as needed.

**Backend**

1. Create a new endpoint to get paginated `DataConsumo` records, supporting date range filters (`startDate`, `endDate`).
2. Create a new endpoint to delete `DataConsumo` records by ID (ensure cascading deletion of related `DataConsumoDetalle` if not handled by Prisma).
3. Create a new endpoint to get detail data of a consumption by ID. This should return the `DataConsumo` along with its `detalles` (including the nested `comida` relation to get food names and measures).
4. Use Prisma to query the data efficiently.
5. Define TypeScript types and Zod validation schemas for requests and responses.
