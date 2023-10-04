#!/bin/sh
# wait-for-postgres.sh

sleep 10

# prisma
npm run prisma:migrate:prod
