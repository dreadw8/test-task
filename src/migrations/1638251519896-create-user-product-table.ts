import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createUserProductTable1638251519896 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'user-product',
              columns: [
                  {
                      name: 'id',
                      type: 'int',
                      isPrimary: true,
                      isGenerated: true,
                      generationStrategy: 'increment',
                  },
                  {
                      name: 'product_id',
                      type: 'int',
                      isNullable: false,
                  },
                  {
                      name: 'user_id',
                      type: 'int',
                      isNullable: false,
                  },
              ],
          }),
          true,
        );

        const foreignKeyToProduct = new TableForeignKey({
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
        });

        const foreignKeyToUser = new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
        });

        await queryRunner.createForeignKeys('user-product', [foreignKeyToProduct, foreignKeyToUser]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('user-product');
        const foreignKeyProduct = table.foreignKeys.find(fk => fk.columnNames.includes('product_id'));
        const foreignKeyUser = table.foreignKeys.find(fk => fk.columnNames.includes('user_id'));

        await queryRunner.dropForeignKeys('user-product', [foreignKeyProduct, foreignKeyUser])
        await queryRunner.dropTable('user-product');
    }
}
