import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('products')
  export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column('text')
    description: string;
  
    @Column('decimal')
    price: number;
  
    // array of image URLs
    @Column('text', { array: true })
    images: string[];
  
    // e.g. ["S", "M", "L"]
    @Column('text', { array: true })
    sizes: string[];
  
    // e.g. ["Blue", "Black"]
    @Column('text', { array: true })
    colors: string[];
  
    @Column({ default: true })
    isActive: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  