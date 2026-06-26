##### BACKEND


I need endpoints for:
    * Listing the results for food from search that matches the query
    * Endpoint to consult with USDA FDC api for food data listed, do calculation and return results
    * Endpoint to register and retrieve user food consumption
    * Endpoint to retrive food listed in the app


##### FRONTEND


Application for Food nutrition data registry

- There will be main page that has:
    - App logo at the top left of the page
    - A hamburger style menu to select option for other routes
        - A toggle to change to english to spanish
        - looking data about consumed foods
        - recorded foods in db
    - A search bar in the middle to look up foods that matches the query
        - Within the bar theres a dropdown as a filter to select with category youre looking that food on
        - A box that show results of matching items from the query
    - A section to list items the user selects from the search
        - This list show the items name and the measure its used to calculate calories
        - It must have a input to allow user to digit the value, only number and positive number are allowed
    - A button a the bottom to do calculation
    - A new page showing the query:
        - This component must be a stylezed table that show the name of the item, amount consuned and expected caloric value
        with a total caloric volume at the end
        - Add a button for the user to record the data of the search
    
    // DATABASE DESIGN:
        model Categoria {
    id          Int       @id @default(autoincrement())
    nameES      String
    nameEN      String
    comidas     Comida[]
}

    model Medida {
        id          Int       @id @default(autoincrement())
        nameES      String
        nameEN      String
        abreviation String
        comidas     Comida[]
    }

    model Comida {
        id          Int       @id @default(autoincrement())
        FDCID       Int
        nameES      String
        nameEN      String
        categoriaId Int
        categoria   Categoria @relation(fields: [categoriaId], references: [id])
        medidaId    Int
        medida      Medida    @relation(fields: [medidaId], references: [id])
        detalles    DataConsumoDetalle[]
    }
    model DataConsumo {
        id                      Int @id @default(autoincrement())
        calorias_consumidas     Int
        timestamp               DateTime @default(now())
        user                    User @relation(fields: [userId], references: [id])
        userId                  Int
        meta_diaria             Int
        detalles                DataConsumoDetalle[]
    }
    model DataConsumoDetalle {
        id                      Int @id @default(autoincrement())
        comida                  Comida @relation(fields: [comidaId], references: [id])
        comidaId                Int
        cantidad_consumida      Int
        calorias_consumida      Int
        dataConsumo             DataConsumo @relation(fields: [dataConsumoId], references: [id])
        dataConsumoId           Int
    }
    model User { 
    id        Int           @id @default(autoincrement()) 
    username  String        @unique
    password  String
    consumos  DataConsumo[]
    }
