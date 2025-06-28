require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { PrismaClient } = require('@prisma/client');
const categoryRoutes = require('./src/categoryRoutes');
const messageRoutes = require('./src/messageRoutes');
const pollRoutes = require('./src/pollRoutes');
const voteRoutes = require('./src/voteRoutes');

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use('/categories', categoryRoutes);
app.use('/messages', messageRoutes);
app.use('/polls', pollRoutes);
app.use('/votes', voteRoutes);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || '*',
        methods: ['GET', 'POST'],
    },
});

// the categories and the subcategory groupchat
const categoryGroups = {
    BestMediaOrganizationinEducationalAdvocacyNigeria: [
        'Best Print Media Educational Advocacy Award',
        'Best Broadcast Media Educational Advocacy Award',
        'Best Digital Media Educational Advocacy Award',
    ],
    BestCSRinEducationAfricaRegional: [
        'Banking And Finance CSR in Education Award',
        'Telecommunications CSR in Education Award',
        'Oil And Gas CSR in Education Award',
        'Food And Beverages CSR in Education Award',
        'Manufacturing CSR in Education Award',
        'Aviation CSR in Education Award',
        'Technology (ICT & Software) in Education Award',
        'Construction CSR in Education Award',
        'Commerce retail CSR in Education Award',
        'Pharmaceuticals CSR in Education Award',
        'Insurance CSR in Education Award',
        'Conglomerates And Diversified Companies CSR in Education Award',
        'TMedia And Entertainment CSR in Education Award',
        'Agriculture And Agribusiness CSR in Education Award',
        'Health Care And Hospitals CSR in Education Award',
        'Professional Services CSR in Education Award',
        'Fintech CSR in Education Award',
        'Microfinance Banks CSR in Education Award',
        'Emerging Telecommunications CSR in Education Award',
        'Real Estate Development CSR in Education Award',
        'Hotels CSR in Education Award',
    ],
    BestNGOContributiontoAchievingEducationforAllAfricaRegional: [
        'Best Educational Infrastructure Initiative By An NGO',
        'Exceptional Donation Of Educational Materials By An NGO',
        'Outstanding Donation Of Education Aid By NGO',
        'Youth Empowerment Through Educational Services by an NGO in Nigeria',
        'Women and Girl\'s Empowerment in Education by an NGO in Nigeria',
    ],
    CreativeArtsIndustryContributiontoEducationNigeria: [
        'Best Nollywood Production And Artiste For Educational Content Award',
        'Best Music Industry Contribution To Education Award',
        'Best Literature And Art Works For Education Award',
        'Visual Arts and Educational Impact Award',
        'Performing Arts and Education Enrichment Award',
        'Film and Media for Educational Advancement Award',
        'Creative Advocacy and Educational Campaigns Award',
    ],
    BestEduTechOrganizationAfrica: [
        'Demo chat',
    ],
    BestNGOContributiontoEducationNigeria: [
        'Best Educational Infrastructure Initiative By An NGO',
        'Exceptional Donation Of Educational Materials By An NGO',
        'Outstanding Donation Of Education Aid By NGO',
        'Youth Empowerment Through Educational Services by an NGO in Nigeria',
        'Women and Girl\'s Empowerment in Education by an NGO in Nigeria',
    ],
    BestCSRinEducationNigeria: [
        'Demo chat',
    ],
    AfricaneducationCSRAwardsBankingTelecomHealthcareMediaetc: [
        'Banking And Finance CSR in Education Award',
        'Telecommunications CSR in Education Award',
        'Oil And Gas CSR in Education Award',
        'Food And Beverages CSR in Education Award',
        'Manufacturing CSR in Education Award',
        'Aviation CSR in Education Award',
        'Technology (ICT & Software) in Education Award',
        'Construction CSR in Education Award',
        'Commerce retail CSR in Education Award',
        'Pharmaceuticals CSR in Education Award',
        'Insurance CSR in Education Award',
        'Conglomerates And Diversified Companies CSR in Education Award',
        'Media And Entertainment CSR in Education Award',
        'Agriculture And Agribusiness CSR in Education Award',
        'Health Care And Hospitals CSR in Education Award',
        'Professional Services CSR in Education Award',
        'Fintech CSR in Education Award',
        'Microfinance Banks CSR in Education Award',
        'Emerging Telecommunications CSR in Education Award',
        'Real Estate Development CSR in Education Award',
        'Hotels CSR in Education Award',
    ],
    BestEducationalFriendlyStateNigeriabyZone: [
        'Best Education Initiative in North Central Zone Award',
        'Best Education Initiative in North East Zone Award',
        'Best Education Initiative in North West Zone Award',
        'Best Education Initiative in South East Zone Award',
        'Best Education Initiative in South South Zone Award',
        'Best Education Initiative in South West Zone Award',
    ],
    BestLibraryinNigerianTertiaryInstitutions: [
        'Best University Library in Nigeria (Public)',
        'Best University Library in Nigeria (Private)',
        'Best Polytechnic Library in Nigeria (Public)',
        'Best College of Education Library in Nigeria (Public)',
        'Best College of Nursing Library in Nigeria (Public)',
        'Best Polytechnic Library in Nigeria (Private)',
        'Best College of Education Library in Nigeria (Private)',
        'Best College of Nursing Library in Nigeria (Private)',
    ],
    BestResearchInstitutionsinNigeria: [
        'Best Agricultural Research Institute in Nigeria',
        'Best Pharmaceutical And Drug Research Institute in Nigeria',
        'Best Environmental And Ecological Research Institute in Nigeria',
    ],
    AfricaLifetimeEducationIconRecognition: [
        'Africa Education Philanthropy Icon Of The Decade (2014-2024)',
        'Literary And New Curriculum Advocate Africa Education Icon Of The Decade (2014-2024)',
        'Africa Technical Educator Icon Of The Decade (2014-2024)',
    ],
    BestFaithBasedOrganizationinEducation404: [
        'Demo chat',
    ],
    BestPoliticalLeadersEducationalSupportServices: [
        'Demo chat',
    ],
    BestSTEMEducationChampion404: [
        'Innovation In Educational Technology Award',
        'Excellence In E-Learning Solutions Award',
        'Best Use Of Artificial Intelligence In Education',
        'Outstanding Contribution To Digital Literacy Award',
        'Best Mobile Learning Solution Award',
    ],
    DiasporaEducationImpactAwards404: [
        'Demo chat',
    ],
    BestInternationalandBilateralContributorstoEducation404: [
        'Demo chat',
    ],
    DiasporaContributionstoEducationinAfrica404: [
        'Demo chat',
    ],
    BestCorporateSocialResponsibilityCSRinEducationNigeria: [
        'Banking And Finance CSR in Education Award',
        'Telecommunications CSR in Education Award',
        'Oil And Gas CSR in Education Award',
        'Food And Beverages CSR in Education Award',
        'Manufacturing CSR in Education Award',
        'Aviation CSR in Education Award',
        'Technology (ICT & Software) in Education Award',
        'Construction CSR in Education Award',
        'Commerce retail CSR in Education Award',
        'Pharmaceuticals CSR in Education Award',
        'Insurance CSR in Education Award',
        'Conglomerates And Diversified Companies CSR in Education Award',
        'Media And Entertainment CSR in Education Award',
        'Agriculture And Agribusiness CSR in Education Award',
        'Health Care And Hospitals CSR in Education Award',
        'Professional Services CSR in Education Award',
        'Fintech CSR in Education Award',
        'Microfinance Banks CSR in Education Award',
        'Emerging Telecommunications CSR in Education Award',
        'Real Estate Development CSR in Education Award',
        'Hotels CSR in Education Award',
    ],
    BestCSRinEducationAfrica: [
        'Banking And Finance CSR in Education Award',
        'Telecommunications CSR in Education Award',
        'Oil And Gas CSR in Education Award',
        'Food And Beverages CSR in Education Award',
        'Manufacturing CSR in Education Award',
        'Aviation CSR in Education Award',
        'Technology (ICT & Software) in Education Award',
        'Construction CSR in Education Award',
        'Commerce retail CSR in Education Award',
        'Pharmaceuticals CSR in Education Award',
        'Insurance CSR in Education Award',
        'Conglomerates And Diversified Companies CSR in Education Award',
        'Media And Entertainment CSR in Education Award',
        'Agriculture And Agribusiness CSR in Education Award',
        'Health Care And Hospitals CSR in Education Award',
        'Professional Services CSR in Education Award',
        'Fintech CSR in Education Award',
        'Microfinance Banks CSR in Education Award',
        'Emerging Telecommunications CSR in Education Award',
        'Real Estate Development CSR in Education Award',
        'Hotels CSR in Education Award',
    ],
    AfricaEducationPhilanthropyIconOfTheDecade20142024: [
        'Africa Education Philanthropy Icon Of The Decade (2014-2024)',
    ],

    AfricaTechnicalEducatorIconOfTheDecade20142024: [
        'Africa Technical Educator Icon Of The Decade (2014-2024)',
    ],

};

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join', async ({ username, userId, category }) => {
        try {
            socket.username = username;
            socket.userId = userId;

            // this will make the user automatically join a general group
            const generalRoom = 'General Judges';
            socket.join(generalRoom);

            const generalMessages = await prisma.message.findMany({
                where: { room: generalRoom },
                orderBy: { timestamp: 'asc' },
                take: 100,
            });
            socket.emit('roomMessages', { room: generalRoom, messages: generalMessages });

            // Check and create poll for General Judges if not exists
            let generalPoll = await prisma.poll.findUnique({ where: { room: generalRoom } });
            if (!generalPoll) {
                generalPoll = await prisma.poll.create({
                    data: {
                        room: generalRoom,
                        question: `Vote for the best in ${generalRoom}`,
                    },
                });

                await prisma.vote.createMany({
                    data: [
                        { option: 'Nominee A', count: 0, pollId: generalPoll.id },
                        { option: 'Nominee B', count: 0, pollId: generalPoll.id },
                        { option: 'Nominee C', count: 0, pollId: generalPoll.id },
                    ],
                });
            }

            const generalVotes = await prisma.vote.findMany({ where: { pollId: generalPoll.id } });
            socket.emit('pollData', { room: generalRoom, poll: { ...generalPoll, votes: generalVotes } });

            // Join the category based subrooms
            const groups = categoryGroups[category] || [];
            for (const group of groups) {
                socket.join(group);

                const messages = await prisma.message.findMany({
                    where: { room: group },
                    orderBy: { timestamp: 'asc' },
                    take: 100,
                });
                socket.emit('roomMessages', { room: group, messages });

                // Check and create poll for this room if not exists
                let poll = await prisma.poll.findUnique({ where: { room: group } });
                if (!poll) {
                    poll = await prisma.poll.create({
                        data: {
                            room: group,
                            question: `Vote for the best in ${group}`,
                        },
                    });

                    await prisma.vote.createMany({
                        data: [
                            { option: 'Nominee A', count: 0, pollId: poll.id },
                            { option: 'Nominee B', count: 0, pollId: poll.id },
                            { option: 'Nominee C', count: 0, pollId: poll.id },
                        ],
                    });
                }

                const votes = await prisma.vote.findMany({ where: { pollId: poll.id } });
                socket.emit('pollData', { room: group, poll: { ...poll, votes } });
            }

            // Send available rooms to frontend
            socket.emit('availableRooms', [generalRoom, ...groups]);

        } catch (err) {
            console.error('Error in join event:', err);
            socket.emit('error', { message: 'Failed to join rooms.' });
        }
    });

    socket.on('sendMessage', async ({ room, message }) => {
        try {
            const msg = await prisma.message.create({
                data: {
                    room,
                    username: socket.username,
                    userId: socket.userId,
                    text: message,
                },
            });
            console.log(`[MESSAGE STORED] ${msg.username} (${msg.userId}) in ${msg.room}: ${msg.text}`);
            io.to(room).emit('message', { room, message: msg });
        } catch (err) {
            console.error('Error in sendMessage:', err);
            socket.emit('error', { message: 'Failed to send message.' });
        }
    });

    socket.on('vote', async ({ room, option }) => {
        try {
            const poll = await prisma.poll.findUnique({ where: { room } });
            if (!poll) return;

            let vote = await prisma.vote.findUnique({ where: { pollId: poll.id, option } });
            if (!vote) {
                vote = await prisma.vote.create({ data: { pollId: poll.id, option, count: 1 } });
            } else {
                vote.count += 1;
                await prisma.vote.update({
                    where: { id: vote.id },
                    data: { count: vote.count },
                });
            }

            console.log(`[VOTE STORED] ${socket.username} (${socket.userId}) voted in ${room} for ${option}`);

            const votes = await prisma.vote.findMany({ where: { pollId: poll.id } });
            io.to(room).emit('pollData', { room, poll: { ...poll, votes } });
        } catch (err) {
            console.error('Error in vote event:', err);
            socket.emit('error', { message: 'Failed to register vote.' });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Ensure your database is PostgreSQL and you have installed 'pg' and 'pg-hstore'.
const PORT = process.env.PORT || 3000;
server.listen(PORT, (err) => {
    if (err) {
        console.error('Server failed to start:', err);
        process.exit(1);
    }
    console.log(`Server listening on port ${PORT}`);
});

