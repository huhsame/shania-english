import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { User } from './user.entity';
import { GeneratedPdf } from './generated-pdf.entity';

export enum DownloadType {
    EMAIL = 'email',
    GOODNOTE = 'goodnote',
    WEB = 'web'
}

@Entity('pdf_downloads')
export class PdfDownload {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => User, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'pdf_id' })
    pdfId: string;

    @ManyToOne(() => GeneratedPdf, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'pdf_id' })
    pdf: GeneratedPdf;

    @Column({
        type: 'enum',
        enum: DownloadType,
        name: 'download_type'
    })
    downloadType: DownloadType;

    @Column({ name: 'downloaded_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    downloadedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 