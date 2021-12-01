import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { ProductEntity } from '../../products';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column('varchar')
  public readonly name: string;

  @Column('varchar')
  public readonly slug: string;

  @OneToMany(type => ProductEntity, item => item.category)
  public readonly products: ProductEntity[];
}
