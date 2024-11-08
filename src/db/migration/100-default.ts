public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`cars\` (
            \`id\` varchar(36) NOT NULL,
            \`plate\` varchar(7) NOT NULL,
            \`brand\` varchar(45) NOT NULL,
            PRIMARY KEY (\`id\`)
        )
    `);

    await queryRunner.query(`
        CREATE TABLE \`Order\` (
            \`id\` varchar(36) NOT NULL,
            \`dateRequest\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`customerId\` varchar(36) NOT NULL,
            \`carId\` varchar(36) NOT NULL,
            PRIMARY KEY (\`id\`)
        )
    `);

    await queryRunner.query(`
        CREATE TABLE \`customers\` (
            \`id\` varchar(36) NOT NULL,
            \`fullName\` varchar(100) NOT NULL,
            \`birthDate\` date NOT NULL,
            PRIMARY KEY (\`id\`)
        )
    `);

    await queryRunner.query(`
        CREATE TABLE \`users\` (
            \`id\` varchar(36) NOT NULL,
            \`name\` varchar(255) NOT NULL,
            \`email\` varchar(255) NOT NULL,
            PRIMARY KEY (\`id\`)
        )
    `);

    // Adding foreign keys
    await queryRunner.query(`
        ALTER TABLE \`Order\`
        ADD CONSTRAINT \`FK_0f88449168b8ffae36cb3f8a140\`
        FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`)
    `);

    await queryRunner.query(`
        ALTER TABLE \`Order\`
        ADD CONSTRAINT \`FK_4e45520de94d82e3dce3b5d5614\`
        FOREIGN KEY (\`carId\`) REFERENCES \`cars\`(\`id\`)
    `);
}
public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_4e45520de94d82e3dce3b5d5614\``);
    await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_0f88449168b8ffae36cb3f8a140\``);
    
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`customers\``);
    await queryRunner.query(`DROP TABLE \`Order\``);
    await queryRunner.query(`DROP TABLE \`cars\``);
}
