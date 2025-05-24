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
import { Expression } from './expression.entity';

@Entity('user_examples')
export class UserExample {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => User, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_id' })
    user: User;

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