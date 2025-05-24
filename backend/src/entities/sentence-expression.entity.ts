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
import { Sentence } from './sentence.entity';
import { Expression } from './expression.entity';

@Entity('sentence_expressions')
@Index(['sentenceId', 'expressionId'], { unique: true })
export class SentenceExpression {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'sentence_id' })
    sentenceId: string;

    @ManyToOne(() => Sentence, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sentence_id' })
    sentence: Sentence;

    @Column({ name: 'expression_id' })
    expressionId: string;

    @ManyToOne(() => Expression, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'expression_id' })
    expression: Expression;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 