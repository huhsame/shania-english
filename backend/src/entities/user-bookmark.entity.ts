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
import { User } from './user.entity';
import { Expression } from './expression.entity';

@Entity('user_bookmarks')
@Index(['userId', 'expressionId'], { unique: true })
export class UserBookmark {
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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 