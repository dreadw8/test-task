import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm'
import { CategoryEntity } from '../../categories';
import { UserEntity } from '../../users';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column('varchar')
  public readonly name: string;

  @Column()
  public readonly categoryId: string;

  @Column('varchar')
  public readonly slug: string;

  @Column('varchar')
  public readonly price: string;

  @ManyToOne(() => CategoryEntity, item => item.products)
  @JoinColumn()
  public readonly category: CategoryEntity;

  @ManyToMany(type => UserEntity, item => item.products)
  @JoinTable({
    name: 'user-product',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id' }
  })
  public readonly users?: UserEntity[];
}
