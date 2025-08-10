const { PrismaClient } = require('@prisma/client')
const { faker } = require('@faker-js/faker')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Mulai seeding database...')

  // // 1. Buat 5 company users
  // console.log('📊 Membuat company users dan companies...')
  // for (let i = 0; i < 10; i++) {
  //   const user = await prisma.users.create({
  //     data: {
  //       role: 'company',
  //       name: faker.company.name(),
  //       email: faker.internet.email(),
  //       password: 'hashed_password',
  //       confirm_password: 'hashed_password',
  //       email_verified: 'yes',
  //       createdAt: faker.date.past(),
  //       updateAt: faker.date.recent()
  //     }
  //   })

  //   await prisma.company.create({
  //     data: {
  //       user_id: user.id,
  //       company_name: faker.helpers.arrayElement([
  //         'PT Unilever Indonesia',
  //         'PT Adaro Energy',
  //         'PT Shopee Indonesia',
  //         'PT PLN',
  //         'PT Pertamina',
  //         'PT Angkasa Pura',
  //         'PT Bank Negara Indonesia',
  //         'PT Traveloka',
  //         'PT Sinar Mas',
  //         'PT Kimia Farma',
  //         'PT Bumi Serpong Damai',
  //         'PT Pelindo',
  //         'PT Astra International',
  //         'PT Telkom Indonesia',
  //         'PT Lion Air',
  //         'PT Jasa Marga',
  //         'PT Bank Central Asia',
  //         'PT XL Axiata',
  //         'PT Indosat Ooredoo',
  //         'PT Indofood Sukses Makmur',
  //         'PT Krakatau Steel',
  //         'PT Semen Indonesia',
  //         'PT Kalbe Farma',
  //         'PT BCA Finance',
  //         'PT Bukalapak',
  //         'PT Tokopedia',
  //         'PT Gojek',
  //         'PT Bank Mandiri',
  //         'PT BNI Life',
  //         'PT BRI',
  //         'PT Waskita Karya',
  //         'PT Gudang Garam',
  //         'PT Garuda Indonesia',
  //         'PT Danone Indonesia'
  //       ]),
  //       email: user.email,
  //       email_verified: 'yes',
  //       address: faker.location.streetAddress(),
  //       logo: faker.image.avatar(),
  //       website: faker.internet.url(),
  //       industry: faker.commerce.department(),
  //       description: faker.company.catchPhrase()
  //     }
  //   })
  // }

  // 2. Buat 10 user profiles
  console.log('👥 Membuat user profiles...')
  for (let i = 0; i < 10; i++) {
    const user = await prisma.users.create({
      data: {
        role: 'user',
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'hashed_password',
        confirm_password: 'hashed_password',
        email_verified: faker.helpers.arrayElement(['yes', 'no']),
        createdAt: faker.date.past(),
        updateAt: faker.date.recent()
      }
    })

    const profile =await prisma.profiles.create({
      data: {
        user_id: user.id,
        username: faker.internet.username(),
        email: user.email,
        email_verified: faker.helpers.arrayElement(['yes', 'no']),
        full_name: user.name,
        age: faker.number.int({ min: 18, max: 35 }).toString(),
        address: faker.location.streetAddress(),
        image: faker.image.avatar(),
        phone: faker.phone.number(),
        bio: faker.lorem.sentence(),
        linkedin: faker.internet.url(),
        portofolio_url: faker.internet.url(),
        city: faker.location.city()
      }
    })

    await prisma.skills.create({
      data:{
        profileId: profile.id,
        // name: faker.hacker.noun(),
        name: faker.helpers.arrayElement([
          'MySQL',
          'Python',
          'Design',
          'Finance',
          'Project Management',
        ]),
        level: faker.helpers.arrayElement(['Beginner', 'Intermediate', 'Advanced', 'Expert'])
      }
    })


  }

  // MATIIN DULU
  // // 3. Ambil semua company records
  // const companies = await prisma.company.findMany({
  //   include: {
  //     user: true
  //   }
  // })

  // // 4. Buat 15 jobs untuk companies
  // console.log('💼 Membuat job postings...')
  // for (let i = 0; i < 50; i++) {
  //   const company = faker.helpers.arrayElement(companies)

  //   await prisma.jobs.create({
  //     data: {
  //       companyId: company.id, // Menggunakan company.id yang benar
  //       company_name: company.company_name,
  //       company_logo: company.logo,
  //       title: faker.helpers.arrayElement([
  //         'Sales Executive B2B',
  //         'Digital Illustrator',
  //         'IT Support',
  //         'Cybersecurity Analyst',
  //         'UI Designer',
  //         'QA Tester Web',
  //         'Project Coordinator',
  //         'Backend Developer',
  //         'Sales Executive Retail',
  //         'Fullstack Developer',
  //         'Creative Designer',
  //         'Customer Service Officer',
  //         'Sales Executive Corporate',
  //         'UX Researcher',
  //         'Procurement Officer',
  //         'System Analyst',
  //         'Marketing Specialist',
  //         'Financial Analyst',
  //         'QA Tester API',
  //         'Business Development Lead',
  //         'Sales Strategy Manager',
  //         'Customer Care Specialist',
  //         'Inventory Coordinator',
  //         'Product Manager',
  //         'QA Manual Tester',
  //         'Copywriter',
  //         'Legal Officer',
  //         'HR Specialist',
  //         'Training Officer',
  //         'Event Coordinator',
  //         'Account Executive',
  //         'Public Relations Officer',
  //         'Machine Learning Engineer',
  //         'Data Analyst',
  //         'Data Scientist',
  //         'Data Engineer',
  //         'Data Visualization Specialist',
  //         'Data Architect',
  //         'Data Analyst',
  //         'Database Administrator',
  //         'Database Engineer',
  //         'DevOps Engineer',
  //         'Cloud Engineer',
  //         'Cybersecurity Analyst',
  //         'Cloud Security Engineer',
  //         'Cybersecurity Specialist',
  //       ]),
  //       description: faker.lorem.paragraphs(2),
  //       salary_min: faker.number.int({ min: 3000000, max: 8000000 }).toString(),
  //       salary_max: faker.number.int({ min: 9000000, max: 15000000 }).toString(),
  //       location: faker.location.city(),
  //       job_type: faker.helpers.arrayElement(['Full Time', 'Part Time', 'Contract', 'Internship']),
  //       is_active: faker.helpers.arrayElement(['active']),
  //       createdAt: faker.date.recent({ days: 30 })
  //     }
  //   })
  // }


  // BEDA
  // 5. Ambil users dan jobs untuk membuat applications dan favorites
  // const users = await prisma.users.findMany({
  //   where: { role: 'user' },
  //   include: { Profile: true }
  // })

  // const jobs = await prisma.jobs.findMany({
  //   where: { is_active: 'active' }
  // })

  // // 6. Buat beberapa applications
  // console.log('📝 Membuat job applications...')
  // for (let i = 0; i < 20; i++) {
  //   const user = faker.helpers.arrayElement(users)
  //   const job = faker.helpers.arrayElement(jobs)
    
  //   // Cek apakah user sudah apply ke job ini
  //   const existingApplication = await prisma.applications.findFirst({
  //     where: {
  //       userId: user.id,
  //       jobId: job.id
  //     }
  //   })

  //   if (!existingApplication && user.Profile) {
  //     await prisma.applications.create({
  //       data: {
  //         userId: user.id,
  //         name_user: user.name,
  //         jobId: job.id,
  //         profileId: user.Profile.id,
  //         status: faker.helpers.arrayElement(['Accepted', 'Screening', 'Rejected']),
  //         createdAt: faker.date.recent({ days: 15 })
  //       }
  //     })
  //   }
  // }

  // // 7. Buat beberapa favorites
  // console.log('⭐ Membuat favorites...')
  // for (let i = 0; i < 15; i++) {
  //   const user = faker.helpers.arrayElement(users)
  //   const job = faker.helpers.arrayElement(jobs)
    
  //   // Cek apakah sudah ada favorite yang sama
  //   const existingFavorite = await prisma.favorites.findFirst({
  //     where: {
  //       userId: user.id,
  //       jobId: job.id
  //     }
  //   })

  //   if (!existingFavorite) {
  //     await prisma.favorites.create({
  //       data: {
  //         userId: user.id,
  //         jobId: job.id,
  //         createdAt: faker.date.recent({ days: 10 })
  //       }
  //     })
  //   }
  // }

  // // 8. Tambahkan education, experience, projects, skills, dan certifications untuk profiles
  // console.log('🎓 Menambahkan data profile tambahan...')
  
  // const profiles = await prisma.profiles.findMany()
  
  // for (const profile of profiles) {
  //   // Education
  //   for (let i = 0; i < faker.number.int({ min: 1, max: 3 }); i++) {
  //     await prisma.educations.create({
  //       data: {
  //         profileId: profile.id,
  //         name_school: faker.company.name() + ' University',
  //         major: faker.person.jobArea(),
  //         start_date: faker.date.past({ years: 8 }),
  //         end_date: faker.date.past({ years: 4 }),
  //         gpa: faker.number.float({ min: 2.5, max: 4.0, precision: 0.01 }).toString(),
  //         description: faker.lorem.sentence()
  //       }
  //     })
  //   }

  //   // Experience  
  //   for (let i = 0; i < faker.number.int({ min: 1, max: 4 }); i++) {
  //     await prisma.experiences.create({
  //       data: {
  //         profileId: profile.id,
  //         title: faker.person.jobTitle(),
  //         company_name: faker.company.name(),
  //         start_date: faker.date.past({ years: 5 }),
  //         end_date: faker.datatype.boolean() ? faker.date.recent() : null,
  //         description: faker.lorem.paragraph()
  //       }
  //     })
  //   }

  //   // Projects
  //   for (let i = 0; i < faker.number.int({ min: 1, max: 3 }); i++) {
  //     await prisma.projects.create({
  //       data: {
  //         profileId: profile.id,
  //         title: faker.lorem.words(3),
  //         link_url: faker.internet.url(),
  //         start_date: faker.date.past({ years: 2 }),
  //         end_date: faker.datatype.boolean() ? faker.date.recent() : null,
  //         description: faker.lorem.paragraph()
  //       }
  //     })
  //   }

  //   // Skills
  //   for (let i = 0; i < faker.number.int({ min: 3, max: 8 }); i++) {
  //     await prisma.skills.create({
  //       data: {
  //         profileId: profile.id,
  //         name: faker.hacker.noun(),
  //         level: faker.helpers.arrayElement(['Beginner', 'Intermediate', 'Advanced', 'Expert'])
  //       }
  //     })
  //   }

  //   // Certifications
  //   for (let i = 0; i < faker.number.int({ min: 1, max: 3 }); i++) {
  //     await prisma.certifications.create({
  //       data: {
  //         profileId: profile.id,
  //         name: faker.lorem.words(4),
  //         issued_by: faker.company.name(),
  //         year: faker.date.past({ years: 3 }).getFullYear().toString(),
  //         description: faker.lorem.sentence(),
  //         id_credential_url: faker.internet.url()
  //       }
  //     })
  //   }
  // }

  // 9. Tampilkan statistik
  // const stats = {
  //   users: await prisma.users.count(),
  //   companies: await prisma.company.count(),
  //   profiles: await prisma.profiles.count(),
  //   jobs: await prisma.jobs.count(),
  //   applications: await prisma.applications.count(),
  //   favorites: await prisma.favorites.count(),
  //   educations: await prisma.educations.count(),
  //   experiences: await prisma.experiences.count(),
  //   projects: await prisma.projects.count(),
  //   skills: await prisma.skills.count(),
  //   certifications: await prisma.certifications.count()
  // }

  // console.log('\n✅ Seeding berhasil! Statistik:')
  // Object.entries(stats).forEach(([key, value]) => {
  //   console.log(`- ${key}: ${value}`)
  // })
}

main()
  .then(() => {
    console.log('\n🌟 Seeding selesai!')
  })
  .catch((e) => {
    console.error('❌ Error saat seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })