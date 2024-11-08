
import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1731028681514 implements MigrationInterface {
    name = 'Default1731028681514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cars\` (\`id\` varchar(36) NOT NULL, \`plate\` varchar(7) NOT NULL, \`brand\` varchar(4>        await queryRunner.query(`CREATE TABLE \`Order\` (\`id\` varchar(36) NOT NULL, \`dateRequest\` timestamp NOT NULL DEFAULT CURREN>        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` varchar(36) NOT NULL, \`fullName\` varchar(100) NOT NULL, \`birthDa>        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar>        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_0f88449168b8ffae36cb3f8a140\` FOREIGN KEY (\`customerId\`) R>
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_4e45520de94d82e3dce3b5d5614\` FOREIGN KEY (\`carId\`) REFERE>    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_4e45520de94d82e3dce3b5d5614\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_0f88449168b8ffae36cb3f8a140\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
        await queryRunner.query(`DROP INDEX \`REL_4e45520de94d82e3dce3b5d561\` ON \`Order\``);
        await queryRunner.query(`DROP INDEX \`REL_0f88449168b8ffae36cb3f8a14\` ON \`Order\``);
        await queryRunner.query(`DROP TABLE \`Order\``);
        await queryRunner.query(`DROP TABLE \`cars\``);
    }

}
