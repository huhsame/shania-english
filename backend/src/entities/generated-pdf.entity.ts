import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Index
} from 'typeorm';
import { Source } from './source.entity';
import { User } from './user.entity';

export enum PDFType {
    COMMON = 'common',
    PERSONALIZED = 'personalized'
}

export enum GenerationStatus {
    PROCESSING = 'processing',
    COMPLETED = 'completed',
    FAILED = 'failed'
}

@Entity('generated_pdfs')
@Index(['sourceId', 'userId'])
@Index(['sourceId', 'pdfType'])
export class GeneratedPdf {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'source_id' })
    sourceId: string;

    @ManyToOne(() => Source, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'source_id' })
    source: Source;

    @Column({ name: 'user_id', nullable: true })
    userId: string;

    @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({
        type: 'enum',
        enum: PDFType,
        name: 'pdf_type'
    })
    pdfType: PDFType;

    @Column({ name: 'file_path' })
    filePath: string;

    @Column({ name: 'file_size', type: 'bigint' })
    fileSize: number;

    @Column({
        type: 'enum',
        enum: GenerationStatus,
        name: 'generation_status',
        default: GenerationStatus.PROCESSING
    })
    generationStatus: GenerationStatus;

    @Column({ name: 'generated_at', type: 'timestamp', nullable: true })
    generatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 