import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable, Index } from 'typeorm';
import { floor } from 'lodash'
import { Chat } from './Chat';

@Entity()
export class User {

	@PrimaryColumn('varchar', { length: 255 })
	id = undefined;

	@PrimaryColumn('varchar', { length: 255 })
	chatId = undefined;

	@Column('varchar', { nullable: true })
	username = undefined;

	@Column('varchar', { nullable: true })
	firstName = undefined;

	@Column('varchar', { nullable: true })
	lastName = undefined;

	@Column({
		type: 'real',
		nullable: true, // not 0 by default to not lose value with schema autosync
	})
	karma = undefined;

	@Column({
		type: 'timestamp',
		nullable: true,
	})
	lastVote = undefined;

	@Column({
		type: 'timestamp',
		nullable: true,
	})
	lastCasino = undefined;

	getName() {
		return this.username || `${this.firstName || ''} ${this.lastName || ''}`;
	}

	getMention() {
		return `<a href="mention:${this.id}">${this.getName()}</a>`;
	}

	getLink() {
		return `<a href="tg://user?id=${this.id}">${this.getName()}</a>`;
	}

	getVotePoint() {
		const point = 1 + floor(this.karma / 10, 1);
		return point > 0 ? point : 0.1;
	}

}