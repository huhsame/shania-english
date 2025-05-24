import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('sources')
export class Source {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    url: string;

    @Column()
    title: string;

    @Column({ type: 'enum', enum: ['webpage', 'youtube', 'text'] })
    content_type: 'webpage' | 'youtube' | 'text';

    @Column({ type: 'timestamp', nullable: true })
    processed_at: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 