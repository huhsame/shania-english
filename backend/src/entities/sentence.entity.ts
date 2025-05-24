import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Source } from './source.entity';

@Entity('sentences')
export class Sentence {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'source_id' })
    sourceId: string;

    @ManyToOne(() => Source, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'source_id' })
    source: Source;

    @Column({ type: 'text' })
    original_text: string;

    @Column({ type: 'text', nullable: true })
    korean_translation: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 