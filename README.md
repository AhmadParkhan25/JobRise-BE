Link documentasi API = https://www.notion.so/API-Reference-JobRise-1d5338f4698d8086b8b1f65909cd6452?pvs=4


1. cp db.sqlite db_backup.sqlite //wanti" kalo data ilang
2. npx prisma db push --accept-data-loss


kalau mau di deploy maka harus menginstall ulang db prisma nya cara nya =
1. npm install @prisma/client@latest prisma@latest
2. npx prisma generate
3. npx prisma db pull


prisma mysql to local .sql
1. npx prisma init --datasource-provider mysql --output ../prisma
2. npx prisma db push
2. mysql -u user -p nama_database < ./db.sql
2. npx prisma db pull
