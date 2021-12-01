import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'

import { ProductEntity } from '../../products';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column('varchar', { length: 20, unique: true })
  public readonly name: string;

  @Column('varchar', { length: 500 })
  public readonly password: string;

  @ManyToMany(type => ProductEntity)
  @JoinTable({
    name: 'user-product',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id' }
  })
  public readonly products: ProductEntity[];
}
