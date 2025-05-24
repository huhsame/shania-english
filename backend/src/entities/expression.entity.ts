import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('expressions')
export class Expression {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    expression_text: string;

    @Column({ type: 'text' })
    korean_meaning: string;

    @Column({ type: 'text', nullable: true })
    usage_context: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 