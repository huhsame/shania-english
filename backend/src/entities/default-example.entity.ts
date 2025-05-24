import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Expression } from './expression.entity';

@Entity('default_examples')
export class DefaultExample {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'expression_id' })
    expressionId: string;

    @ManyToOne(() => Expression, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'expression_id' })
    expression: Expression;

    @Column({ type: 'text' })
    example_text: string;

    @Column({ type: 'text', nullable: true })
    korean_translation: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 