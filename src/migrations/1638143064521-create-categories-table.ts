import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class categoriesTable1638143064521 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'categories',
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
              ],
          }),
          true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categories');
    }
}
