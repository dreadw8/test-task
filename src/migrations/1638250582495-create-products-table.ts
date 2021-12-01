import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class productsTable1638143274854 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'products',
              columns: [
                  {
                      name: 'id',
                      type: 'int',
                      isPrimary: true,
                      isGenerated: true,
                      generationStrategy: 'increment',
                  },
                  {
                      name: 'name',
                      type: 'varchar',
                      isUnique: true,
                      isNullable: false,
                  },
                  {
                      name: 'slug',
                      type: 'varchar',
                      isNullable: false,
                  },
                  {
                      name: 'price',
                      type: 'varchar',
                      isNullable: false,
                  },
                  {
                      name: 'category_id',
                      type: 'int',
                      isNullable: false,
                  },
              ],
          }),
          true,
        );

        const foreignKey = new TableForeignKey({
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'categories',
        });

        await queryRunner.createForeignKey('products', foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('products');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.includes('category_id'));

        await queryRunner.dropForeignKey('products', foreignKey)
        await queryRunner.dropTable('products');
    }
}
