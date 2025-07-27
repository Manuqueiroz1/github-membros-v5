import { BonusResource } from '../types';

// Curso Intensivo de 30 Dias - Bônus Especial
const cursoIntensivo30Dias: BonusResource = {
  id: 'curso-intensivo-30-dias',
  title: 'Curso Intensivo de 30 Dias',
  description: 'Um programa completo para acelerar seu aprendizado de inglês',
  type: 'course',
  thumbnail: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=800',
  totalLessons: 30,
  totalDuration: '30h+',
  rating: 4.9,
  downloads: 2500,
  lessons: [
    {
      id: '1',
      title: 'Day 1: Getting Started - Your English Journey Begins',
      description: 'Estabeleça suas metas e comece sua jornada de 30 dias',
      videoUrl: 'https://www.youtube.com/embed/mttHTuEK5Xs',
      duration: '45:30',
      textContent: `
# Day 1: Getting Started - Your English Journey Begins

## Welcome to Your 30-Day English Intensive Course!

Congratulations on taking this important step in your English learning journey! Over the next 30 days, you'll experience a transformation in your English skills through our carefully designed intensive program.

## What Makes This Course Special?

### 1. Daily Structure
- **Morning Session (20 minutes)**: Vocabulary and grammar focus
- **Afternoon Session (15 minutes)**: Listening and pronunciation practice
- **Evening Session (10 minutes)**: Review and consolidation

### 2. Progressive Learning
Each day builds upon the previous one, ensuring steady progress:
- **Week 1**: Foundation building
- **Week 2**: Skill development
- **Week 3**: Practical application
- **Week 4**: Fluency enhancement

### 3. Real-World Application
Every lesson connects to real-life situations you'll encounter:
- Daily conversations
- Professional interactions
- Travel scenarios
- Social situations

## Your Learning Goals for Day 1:

### Primary Objectives:
1. **Set Clear Goals**: Define what you want to achieve in 30 days
2. **Assess Your Level**: Understand your current English proficiency
3. **Create Your Study Schedule**: Plan your daily learning routine
4. **Learn Essential Phrases**: Master 10 key expressions for daily use

### Essential Phrases for Today:
1. "Good morning! How are you today?"
2. "I'm learning English and I'm excited about it!"
3. "Could you please help me with this?"
4. "I don't understand. Could you repeat that?"
5. "Thank you for your patience."
6. "I'm making progress every day."
7. "Practice makes perfect."
8. "I'm committed to learning."
9. "This is challenging but rewarding."
10. "I believe in myself."

## Study Tips for Success:

### 1. Consistency is Key
- Study at the same time each day
- Even 15 minutes daily is better than 2 hours once a week
- Create a dedicated study space

### 2. Active Learning
- Speak out loud, don't just read silently
- Write down new words and phrases
- Practice with real-life scenarios

### 3. Track Your Progress
- Keep a learning journal
- Record yourself speaking
- Celebrate small victories

## Homework for Tonight:
1. Write a short paragraph about why you want to learn English
2. Practice the 10 essential phrases out loud
3. Set up your study schedule for the next 29 days
4. Find an English song you like and listen to it

## Tomorrow's Preview:
Day 2 will focus on "Building Your Foundation" where we'll work on basic sentence structures and expand your essential vocabulary.

Remember: Every expert was once a beginner. Your journey starts now!
      `,
      exercises: [
        {
          id: '1',
          question: 'What is the recommended daily study time structure for this course?',
          options: [
            '60 minutes in one session',
            '20 minutes morning, 15 minutes afternoon, 10 minutes evening',
            '30 minutes morning, 30 minutes evening',
            '45 minutes whenever convenient'
          ],
          correctAnswer: 1,
          explanation: 'The course recommends a distributed approach: 20 minutes in the morning for vocabulary and grammar, 15 minutes in the afternoon for listening and pronunciation, and 10 minutes in the evening for review.'
        },
        {
          id: '2',
          question: 'Which week focuses on "Practical Application"?',
          options: [
            'Week 1',
            'Week 2', 
            'Week 3',
            'Week 4'
          ],
          correctAnswer: 2,
          explanation: 'Week 3 is dedicated to practical application, where you apply the skills learned in the first two weeks to real-world situations.'
        },
        {
          id: '3',
          question: 'What is the most important factor for success in language learning according to this lesson?',
          options: [
            'Studying for long hours',
            'Memorizing grammar rules',
            'Consistency in daily practice',
            'Having perfect pronunciation'
          ],
          correctAnswer: 2,
          explanation: 'Consistency is emphasized as the key to success. Regular daily practice, even for short periods, is more effective than irregular long study sessions.'
        },
        {
          id: '4',
          question: 'How many essential phrases should you master on Day 1?',
          options: [
            '5 phrases',
            '10 phrases',
            '15 phrases',
            '20 phrases'
          ],
          correctAnswer: 1,
          explanation: 'Day 1 focuses on mastering 10 essential phrases that are fundamental for daily English communication.'
        },
        {
          id: '5',
          question: 'What should you do as homework after Day 1?',
          options: [
            'Only practice the phrases',
            'Write about your motivation, practice phrases, set schedule, and listen to English music',
            'Just read the next lesson',
            'Memorize all grammar rules'
          ],
          correctAnswer: 1,
          explanation: 'The homework includes four activities: writing about your motivation, practicing phrases, setting up your study schedule, and listening to an English song you like.'
        }
      ],
      completed: false
    },
    {
      id: '2',
      title: 'Day 2: Building Your Foundation - Essential Grammar',
      description: 'Construa uma base sólida com estruturas gramaticais essenciais',
      videoUrl: 'https://www.youtube.com/embed/-6J-tNXZkQc',
      duration: '50:15',
      textContent: `
# Day 2: Building Your Foundation - Essential Grammar

## Welcome Back to Day 2!

Yesterday you set your goals and learned essential phrases. Today we're building the grammatical foundation that will support all your future learning.

## Why Grammar Matters

Think of grammar as the skeleton of language:
- **Structure**: It gives shape to your thoughts
- **Clarity**: It helps others understand you precisely
- **Confidence**: Knowing the rules makes you feel secure when speaking

## Today's Grammar Focus: Sentence Structure

### The Basic English Sentence Pattern: SVO

**S**ubject + **V**erb + **O**bject

Examples:
- **I** (S) **eat** (V) **breakfast** (O)
- **She** (S) **reads** (V) **books** (O)
- **They** (S) **watch** (V) **movies** (O)

### Expanding Your Sentences

#### Adding Adjectives:
- I eat **healthy** breakfast
- She reads **interesting** books
- They watch **exciting** movies

#### Adding Adverbs:
- I eat breakfast **quickly**
- She reads books **carefully**
- They watch movies **together**

#### Adding Time and Place:
- I eat breakfast **at home** **every morning**
- She reads books **in the library** **after work**
- They watch movies **at the cinema** **on weekends**

## Present Tense Mastery

### Simple Present Tense
Used for habits, facts, and general truths.

**Positive Form:**
- I/You/We/They + base verb
- He/She/It + base verb + s/es

**Examples:**
- I work in an office
- She works in a hospital
- We work together

**Negative Form:**
- I/You/We/They + don't + base verb
- He/She/It + doesn't + base verb

**Examples:**
- I don't work on Sundays
- She doesn't work late
- We don't work weekends

**Question Form:**
- Do + I/you/we/they + base verb?
- Does + he/she/it + base verb?

**Examples:**
- Do you work here?
- Does she work with you?
- Do they work together?

## Common Mistakes to Avoid

### 1. Forgetting the 's' in third person
❌ She work in a bank
✅ She works in a bank

### 2. Using 'does' with 's' ending
❌ Does she works here?
✅ Does she work here?

### 3. Wrong word order in questions
❌ Where she works?
✅ Where does she work?

## Practice Exercises

### Exercise 1: Complete the sentences
1. I _____ (study) English every day
2. She _____ (not/like) coffee
3. _____ you _____ (speak) Spanish?
4. He _____ (go) to work by bus
5. We _____ (not/watch) TV in the morning

### Exercise 2: Make questions
1. She lives in New York → _____?
2. They play football → _____?
3. He speaks three languages → _____?

## Vocabulary Building: Daily Activities

Learn these 15 essential verbs:
1. **wake up** - I wake up at 7 AM
2. **get dressed** - She gets dressed quickly
3. **have breakfast** - We have breakfast together
4. **go to work** - He goes to work by train
5. **start work** - I start work at 9 AM
6. **have lunch** - They have lunch at noon
7. **finish work** - She finishes work at 5 PM
8. **go home** - We go home together
9. **cook dinner** - I cook dinner for my family
10. **watch TV** - They watch TV after dinner
11. **read books** - She reads books before bed
12. **brush teeth** - I brush my teeth twice a day
13. **take a shower** - He takes a shower every morning
14. **go to bed** - We go to bed at 10 PM
15. **sleep** - I sleep eight hours every night

## Today's Challenge: Describe Your Day

Write 5 sentences about your typical day using the SVO pattern and present tense:

Example:
1. I wake up at 6:30 AM every morning
2. I have breakfast with my family
3. I go to work by car
4. I finish work at 6 PM
5. I watch TV before going to bed

## Homework for Tonight:
1. Complete the practice exercises above
2. Write 10 sentences about your daily routine
3. Practice saying the 15 daily activity verbs out loud
4. Record yourself describing your typical day

## Tomorrow's Preview:
Day 3 will focus on "Asking Questions and Getting Information" - essential skills for real conversations.

Remember: Grammar is your friend, not your enemy. Master these basics and everything else becomes easier!
      `,
      exercises: [
        {
          id: '1',
          question: 'What is the basic English sentence pattern taught in this lesson?',
          options: [
            'SOV (Subject-Object-Verb)',
            'SVO (Subject-Verb-Object)',
            'VSO (Verb-Subject-Object)',
            'OSV (Object-Subject-Verb)'
          ],
          correctAnswer: 1,
          explanation: 'The basic English sentence pattern is SVO (Subject-Verb-Object), which is the foundation for building clear and correct sentences.'
        },
        {
          id: '2',
          question: 'In present tense, what do you add to the verb for he/she/it?',
          options: [
            'Nothing',
            's or es',
            'ed',
            'ing'
          ],
          correctAnswer: 1,
          explanation: 'For third person singular (he/she/it) in present tense, you add "s" or "es" to the base verb (e.g., "She works", "He goes").'
        },
        {
          id: '3',
          question: 'Which sentence is correct?',
          options: [
            'Does she works here?',
            'Do she work here?',
            'Does she work here?',
            'Does she working here?'
          ],
          correctAnswer: 2,
          explanation: 'The correct form is "Does she work here?" - use "does" with he/she/it and the base form of the verb (without "s").'
        },
        {
          id: '4',
          question: 'How many daily activity verbs should you learn today?',
          options: [
            '10 verbs',
            '15 verbs',
            '20 verbs',
            '25 verbs'
          ],
          correctAnswer: 1,
          explanation: 'Today\'s lesson focuses on learning 15 essential daily activity verbs to describe your routine.'
        }
      ],
      completed: false
    },
    {
      id: '3',
      title: 'Day 3: Asking Questions and Getting Information',
      description: 'Aprenda a fazer perguntas eficazes e obter informações',
      videoUrl: 'https://www.youtube.com/embed/povotikiPeg',
      duration: '42:20',
      textContent: `
# Day 3: Asking Questions and Getting Information

## The Power of Questions

Questions are the key to communication! They help you:
- **Get information** you need
- **Start conversations** with new people
- **Show interest** in others
- **Clarify** when you don't understand

## Question Words (WH-Questions)

### The Essential Question Words:

1. **WHAT** - asks about things, actions, or information
   - What is your name?
   - What do you do for work?
   - What time is it?

2. **WHERE** - asks about places or locations
   - Where do you live?
   - Where is the bathroom?
   - Where are you from?

3. **WHEN** - asks about time
   - When do you start work?
   - When is your birthday?
   - When did you arrive?

4. **WHO** - asks about people
   - Who is your teacher?
   - Who are you calling?
   - Who lives here?

5. **WHY** - asks about reasons
   - Why are you learning English?
   - Why is the store closed?
   - Why did you choose this?

6. **HOW** - asks about manner, method, or condition
   - How are you?
   - How do you get to work?
   - How much does it cost?

## Question Formation Rules

### With BE verb (am/is/are):
**Pattern:** Question word + BE + subject + complement?
- Where **are** you **from**?
- What **is** your **name**?
- How **are** you **today**?

### With other verbs:
**Pattern:** Question word + DO/DOES + subject + base verb?
- What **do** you **do** for work?
- Where **does** she **live**?
- When **do** they **start** class?

## Yes/No Questions

### With BE verb:
- **Are** you a student? → Yes, I am. / No, I'm not.
- **Is** she your sister? → Yes, she is. / No, she isn't.

### With other verbs:
- **Do** you speak English? → Yes, I do. / No, I don't.
- **Does** he work here? → Yes, he does. / No, he doesn't.

## Polite Question Forms

### Making Requests:
- **Could you** help me, please?
- **Would you** mind opening the window?
- **Can you** tell me the time?

### Asking for Permission:
- **May I** use your phone?
- **Could I** borrow your pen?
- **Can I** sit here?

### Offering Help:
- **Would you like** some coffee?
- **Can I** help you with that?
- **Shall I** open the door?

## Common Question Patterns for Daily Life

### At a Restaurant:
- What would you like to drink?
- Could I have the menu, please?
- How much is this dish?
- Where is the restroom?

### At Work:
- What time is the meeting?
- Who is presenting today?
- Where should I put this?
- How do I use this machine?

### Shopping:
- How much does this cost?
- Do you have this in a different size?
- Where can I pay?
- What time do you close?

### Getting Directions:
- Where is the nearest bank?
- How do I get to the airport?
- Is it far from here?
- Which bus should I take?

## Practice Conversations

### Conversation 1: Meeting Someone New
**A:** Hi! What's your name?
**B:** I'm Maria. What about you?
**A:** I'm John. Where are you from, Maria?
**B:** I'm from Brazil. How about you?
**A:** I'm from Canada. What do you do for work?
**B:** I'm a teacher. What about you?

### Conversation 2: Asking for Help
**A:** Excuse me, could you help me?
**B:** Of course! What do you need?
**A:** Where is the train station?
**B:** It's two blocks from here. Do you see that tall building?
**A:** Yes, I do.
**B:** Walk straight until you reach it, then turn left.
**A:** Thank you so much!

## Question Intonation

### Rising Intonation (↗):
Used for Yes/No questions:
- Are you ready? ↗
- Do you like pizza? ↗
- Is this your book? ↗

### Falling Intonation (↘):
Used for WH-questions:
- What's your name? ↘
- Where do you live? ↘
- How are you? ↘

## Today's Challenge: Information Hunt

Practice asking questions by finding out these things about a friend or family member:
1. Their favorite food
2. Their hobby
3. Their dream vacation destination
4. Their favorite movie
5. What they did last weekend

## Homework for Tonight:
1. Write 10 questions using different question words
2. Practice the two conversations above out loud
3. Ask someone 5 questions about their day
4. Record yourself asking and answering questions

## Tomorrow's Preview:
Day 4 will focus on "Describing People and Things" - essential vocabulary and adjectives for detailed descriptions.

Remember: Don't be afraid to ask questions! People appreciate when you show interest in them and their lives.
      `,
      exercises: [
        {
          id: '1',
          question: 'Which question word do you use to ask about places?',
          options: [
            'What',
            'When',
            'Where',
            'Who'
          ],
          correctAnswer: 2,
          explanation: '"Where" is used to ask about places or locations, such as "Where do you live?" or "Where is the bathroom?"'
        },
        {
          id: '2',
          question: 'What is the correct question formation with the BE verb?',
          options: [
            'Question word + subject + BE + complement?',
            'Question word + BE + subject + complement?',
            'BE + question word + subject + complement?',
            'Subject + question word + BE + complement?'
          ],
          correctAnswer: 1,
          explanation: 'With the BE verb, the pattern is: Question word + BE + subject + complement (e.g., "Where are you from?")'
        },
        {
          id: '3',
          question: 'Which intonation pattern is used for Yes/No questions?',
          options: [
            'Falling intonation (↘)',
            'Rising intonation (↗)',
            'Flat intonation',
            'No specific pattern'
          ],
          correctAnswer: 1,
          explanation: 'Yes/No questions use rising intonation (↗), while WH-questions use falling intonation (↘).'
        },
        {
          id: '4',
          question: 'Which is the most polite way to ask for help?',
          options: [
            'Help me!',
            'I need help.',
            'Could you help me, please?',
            'You must help me.'
          ],
          correctAnswer: 2,
          explanation: '"Could you help me, please?" is the most polite form, using "could" and "please" to make a courteous request.'
        }
      ],
      completed: false
    }
    // Continue with more lessons... (Days 4-30)
    // For brevity, I'll add a few more key lessons
  ]
};

export const bonusResources: BonusResource[] = [
  cursoIntensivo30Dias,
  {
    id: 'maximizing-teacher-poli',
    title: 'Maximizando seu Aprendizado com a Teacher Poli',
    description: 'Ebook Completo Explicando Todas as Funcionalidades da Teacher Poli',
    type: 'ebook',
    thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
    totalLessons: 5,
    totalDuration: '2h 30min',
    rating: 4.8,
    downloads: 1250,
    lessons: [
      {
        id: '1',
        title: 'Introdução à Teacher Poli',
        description: 'Conheça os fundamentos da plataforma',
        videoUrl: 'https://www.youtube.com/embed/mttHTuEK5Xs',
        duration: '15:30',
        textContent: `
# Introdução à Teacher Poli

## O que é a Teacher Poli?

A Teacher Poli é uma plataforma revolucionária de ensino de inglês que utiliza inteligência artificial para personalizar completamente sua experiência de aprendizado.

## Principais Características:

### 1. Personalização Completa
- Adapta-se ao seu nível atual
- Considera seus objetivos específicos
- Ajusta o ritmo conforme seu progresso

### 2. Metodologia Inovadora
- Baseada em neurociência
- Foco na conversação prática
- Aprendizado contextualizado

### 3. Suporte 24/7
- IA sempre disponível
- Correção instantânea
- Feedback personalizado

## Como Começar

1. **Complete seu perfil**: Forneça informações sobre seu nível e objetivos
2. **Gere seu plano**: Deixe a IA criar um plano personalizado
3. **Comece a praticar**: Inicie suas conversações com a Teacher Poli

## Dicas Importantes

- Seja consistente nos estudos
- Pratique diariamente, mesmo que por poucos minutos
- Não tenha medo de cometer erros - eles fazem parte do aprendizado
        `,
        exercises: [
          {
            id: '1',
            question: 'Qual é a principal característica da Teacher Poli?',
            options: [
              'Ensino tradicional de gramática',
              'Personalização completa usando IA',
              'Aulas em grupo',
              'Foco apenas em leitura'
            ],
            correctAnswer: 1,
            explanation: 'A Teacher Poli se destaca pela personalização completa usando inteligência artificial, adaptando-se ao nível e objetivos de cada aluno.'
          },
          {
            id: '2',
            question: 'Quantas horas por dia a Teacher Poli está disponível?',
            options: [
              '8 horas',
              '12 horas',
              '16 horas',
              '24 horas'
            ],
            correctAnswer: 3,
            explanation: 'A Teacher Poli oferece suporte 24/7, ou seja, está disponível 24 horas por dia, 7 dias por semana.'
          },
          {
            id: '3',
            question: 'Qual é o primeiro passo para começar com a Teacher Poli?',
            options: [
              'Fazer uma prova',
              'Completar seu perfil',
              'Pagar uma taxa',
              'Baixar um aplicativo'
            ],
            correctAnswer: 1,
            explanation: 'O primeiro passo é completar seu perfil, fornecendo informações sobre seu nível atual e objetivos de aprendizado.'
          }
        ],
        completed: false
      },
      {
        id: '2',
        title: 'Configurando seu Perfil',
        description: 'Como otimizar suas configurações pessoais',
        videoUrl: 'https://www.youtube.com/embed/-6J-tNXZkQc',
        duration: '12:45',
        textContent: `
# Configurando seu Perfil na Teacher Poli

## Por que o Perfil é Importante?

Seu perfil é a base para toda a personalização da Teacher Poli. Quanto mais informações precisas você fornecer, melhor será sua experiência de aprendizado.

## Informações Essenciais:

### 1. Nível Atual de Inglês
- **Iniciante**: Pouco ou nenhum conhecimento
- **Básico**: Conhece o básico, mas tem dificuldades
- **Intermediário**: Consegue se comunicar, mas quer melhorar
- **Avançado**: Quer aperfeiçoar e ganhar fluência

### 2. Objetivos de Aprendizado
- Conversação do dia a dia
- Inglês para negócios
- Preparação para exames
- Viagens internacionais
- Crescimento profissional

### 3. Tempo Disponível
- Defina quantos minutos por dia pode estudar
- Seja realista com sua disponibilidade
- A consistência é mais importante que a quantidade

## Configurações Avançadas:

### Preferências de Aprendizado
- Estilo visual, auditivo ou cinestésico
- Preferência por conversação ou exercícios
- Temas de interesse pessoal

### Metas Específicas
- Prazo para atingir objetivos
- Marcos intermediários
- Áreas de foco prioritário

## Dicas para um Perfil Eficaz:

1. **Seja honesto** sobre seu nível atual
2. **Defina objetivos claros** e mensuráveis
3. **Atualize regularmente** conforme evolui
4. **Experimente diferentes configurações** para encontrar o que funciona melhor
        `,
        exercises: [
          {
            id: '1',
            question: 'Por que é importante configurar corretamente seu perfil?',
            options: [
              'Para impressionar outros usuários',
              'Para ter acesso a mais conteúdo',
              'Para personalizar melhor a experiência de aprendizado',
              'Para receber certificados'
            ],
            correctAnswer: 2,
            explanation: 'Um perfil bem configurado permite que a Teacher Poli personalize melhor sua experiência de aprendizado, adaptando o conteúdo às suas necessidades específicas.'
          },
          {
            id: '2',
            question: 'Qual é mais importante para o aprendizado eficaz?',
            options: [
              'Estudar muitas horas por dia',
              'Ter consistência nos estudos',
              'Memorizar muitas palavras',
              'Fazer muitos exercícios de gramática'
            ],
            correctAnswer: 1,
            explanation: 'A consistência é mais importante que a quantidade. É melhor estudar 15 minutos todos os dias do que 2 horas uma vez por semana.'
          }
        ],
        completed: false
      },
      {
        id: '3',
        title: 'Navegando pela Plataforma',
        description: 'Conheça todas as funcionalidades disponíveis',
        videoUrl: 'https://www.youtube.com/embed/povotikiPeg',
        duration: '18:20',
        textContent: `
# Navegando pela Plataforma Teacher Poli

## Interface Principal

A Teacher Poli foi projetada para ser intuitiva e fácil de usar. Vamos explorar cada seção:

### 1. Dashboard Principal
- Visão geral do seu progresso
- Próximas atividades recomendadas
- Estatísticas de aprendizado
- Conquistas e marcos

### 2. Chat com a Teacher Poli
- Interface de conversação principal
- Correção em tempo real
- Sugestões contextuais
- Histórico de conversas

### 3. Plano de Estudos
- Cronograma personalizado
- Atividades diárias
- Metas semanais e mensais
- Progresso detalhado

### 4. Biblioteca de Recursos
- Materiais complementares
- Exercícios extras
- Conteúdo por temas
- Downloads disponíveis

## Funcionalidades Avançadas:

### Sistema de Gamificação
- Pontos por atividades completadas
- Níveis de progresso
- Badges e conquistas
- Ranking de desempenho

### Análise de Progresso
- Gráficos de evolução
- Áreas de melhoria
- Tempo de estudo
- Consistência de uso

### Configurações Personalizadas
- Notificações
- Lembretes de estudo
- Preferências de interface
- Configurações de privacidade

## Dicas de Navegação:

1. **Explore todas as seções** para conhecer os recursos
2. **Use os atalhos** para navegação mais rápida
3. **Personalize sua experiência** através das configurações
4. **Aproveite o sistema de busca** para encontrar conteúdo específico
        `,
        exercises: [
          {
            id: '1',
            question: 'Onde você pode ver seu progresso geral na plataforma?',
            options: [
              'No chat com a Teacher Poli',
              'No dashboard principal',
              'Na biblioteca de recursos',
              'Nas configurações'
            ],
            correctAnswer: 1,
            explanation: 'O dashboard principal oferece uma visão geral completa do seu progresso, incluindo estatísticas, próximas atividades e conquistas.'
          },
          {
            id: '2',
            question: 'O que o sistema de gamificação inclui?',
            options: [
              'Apenas pontos',
              'Pontos e níveis',
              'Pontos, níveis, badges e ranking',
              'Apenas badges'
            ],
            correctAnswer: 2,
            explanation: 'O sistema de gamificação é completo, incluindo pontos por atividades, níveis de progresso, badges/conquistas e ranking de desempenho.'
          }
        ],
        completed: false
      },
      {
        id: '4',
        title: 'Maximizando seu Aprendizado',
        description: 'Estratégias para acelerar seu progresso',
        videoUrl: 'https://www.youtube.com/embed/mttHTuEK5Xs',
        duration: '22:15',
        textContent: `
# Maximizando seu Aprendizado com a Teacher Poli

## Estratégias Comprovadas

### 1. Método da Imersão Controlada
- Dedique tempo diário exclusivo ao inglês
- Crie um ambiente livre de distrações
- Use apenas inglês durante as sessões
- Gradualmente aumente o tempo de imersão

### 2. Prática Ativa vs Passiva
- **Prática Ativa**: Conversação, escrita, exercícios
- **Prática Passiva**: Escuta, leitura, observação
- Combine ambas para resultados otimizados
- Priorize a prática ativa para maior retenção

### 3. Técnica do Espaçamento
- Revise conteúdo em intervalos crescentes
- Use o sistema de repetição espaçada
- Não acumule muito conteúdo novo de uma vez
- Consolide antes de avançar

## Aproveitando a IA da Teacher Poli:

### Feedback Inteligente
- Aceite correções sem resistência
- Peça explicações detalhadas quando necessário
- Use os exemplos fornecidos para praticar
- Aplique as correções em novos contextos

### Personalização Dinâmica
- Seja honesto sobre suas dificuldades
- Comunique suas preferências de aprendizado
- Ajuste configurações conforme evolui
- Experimente diferentes abordagens

### Conversação Natural
- Trate a Teacher Poli como uma pessoa real
- Faça perguntas sobre temas do seu interesse
- Pratique situações do cotidiano
- Não tenha medo de cometer erros

## Técnicas Avançadas:

### 1. Shadowing
- Repita simultaneamente com áudios
- Imite entonação e ritmo
- Comece devagar e acelere gradualmente
- Foque na fluência, não na perfeição

### 2. Thinking in English
- Pratique pensar em inglês
- Descreva mentalmente suas atividades
- Use monólogos internos em inglês
- Traduza menos, contextualize mais

### 3. Contextualização
- Aprenda palavras em frases completas
- Associe vocabulário a situações reais
- Crie histórias com novo vocabulário
- Use exemplos pessoais

## Medindo seu Progresso:

### Indicadores Quantitativos
- Tempo de resposta em conversações
- Número de erros por sessão
- Vocabulário ativo vs passivo
- Fluência em diferentes temas

### Indicadores Qualitativos
- Confiança ao falar
- Naturalidade das expressões
- Compreensão de nuances
- Capacidade de improvisação

## Mantendo a Motivação:

1. **Celebre pequenas vitórias** diariamente
2. **Defina metas realistas** e alcançáveis
3. **Varie os tipos de atividade** para evitar monotonia
4. **Conecte o aprendizado** aos seus interesses pessoais
5. **Acompanhe seu progresso** visualmente
        `,
        exercises: [
          {
            id: '1',
            question: 'Qual é a diferença entre prática ativa e passiva?',
            options: [
              'Ativa é mais difícil, passiva é mais fácil',
              'Ativa envolve produção (falar/escrever), passiva envolve recepção (ouvir/ler)',
              'Ativa é para iniciantes, passiva para avançados',
              'Não há diferença significativa'
            ],
            correctAnswer: 1,
            explanation: 'Prática ativa envolve produzir linguagem (conversação, escrita), enquanto prática passiva envolve receber linguagem (escuta, leitura). Ambas são importantes, mas a ativa gera maior retenção.'
          },
          {
            id: '2',
            question: 'O que é a técnica do "Shadowing"?',
            options: [
              'Estudar na sombra',
              'Repetir simultaneamente com áudios',
              'Seguir outros estudantes',
              'Estudar em grupo'
            ],
            correctAnswer: 1,
            explanation: 'Shadowing é a técnica de repetir simultaneamente com áudios, imitando entonação e ritmo para melhorar a fluência e pronúncia.'
          },
          {
            id: '3',
            question: 'Por que é importante "pensar em inglês"?',
            options: [
              'Para impressionar outras pessoas',
              'Para reduzir a tradução mental e aumentar a fluência',
              'Para memorizar mais vocabulário',
              'Para melhorar a gramática'
            ],
            correctAnswer: 1,
            explanation: 'Pensar em inglês reduz a necessidade de tradução mental, tornando a comunicação mais natural e fluente.'
          }
        ],
        completed: false
      },
      {
        id: '5',
        title: 'Recursos Avançados',
        description: 'Funcionalidades especiais para usuários experientes',
        videoUrl: 'https://www.youtube.com/embed/-6J-tNXZkQc',
        duration: '25:40',
        textContent: `
# Recursos Avançados da Teacher Poli

## Funcionalidades Especiais

### 1. Análise de Sentimentos
A Teacher Poli pode detectar:
- Seu nível de confiança
- Áreas de frustração
- Momentos de progresso
- Padrões emocionais no aprendizado

### 2. Adaptação Contextual
- Ajusta dificuldade em tempo real
- Identifica padrões de erro
- Personaliza exemplos baseados em seus interesses
- Sugere tópicos relevantes para prática

### 3. Simulação de Cenários
- Entrevistas de emprego
- Apresentações profissionais
- Conversas casuais
- Situações de viagem
- Negociações comerciais

## Recursos de Análise:

### Dashboard Avançado
- Heatmap de progresso por habilidade
- Gráficos de evolução temporal
- Comparação com outros usuários
- Previsões de progresso futuro

### Relatórios Detalhados
- Análise semanal/mensal
- Identificação de pontos fortes
- Recomendações personalizadas
- Planos de melhoria específicos

### Métricas Avançadas
- Velocidade de fala
- Precisão gramatical
- Riqueza vocabular
- Fluência conversacional

## Integração com Ferramentas Externas:

### Calendário Inteligente
- Sincronização com Google Calendar
- Lembretes automáticos
- Bloqueio de tempo para estudos
- Otimização de horários

### Exportação de Dados
- Relatórios em PDF
- Planilhas de progresso
- Backup de conversas
- Portfólio de aprendizado

### APIs e Integrações
- Conecta com outras plataformas
- Sincronização de progresso
- Compartilhamento de conquistas
- Integração com redes sociais

## Recursos de Comunidade:

### Grupos de Estudo
- Formação automática por nível
- Desafios em grupo
- Competições amigáveis
- Projetos colaborativos

### Mentoria Peer-to-Peer
- Conexão com usuários avançados
- Sistema de mentoria
- Troca de experiências
- Suporte mútuo

### Eventos Virtuais
- Webinars especializados
- Sessões de conversação em grupo
- Workshops temáticos
- Conferências online

## Personalização Avançada:

### Criação de Conteúdo
- Desenvolva seus próprios exercícios
- Crie listas de vocabulário personalizadas
- Defina metas específicas
- Configure lembretes customizados

### Modo Especialista
- Interface avançada
- Controles granulares
- Estatísticas detalhadas
- Configurações experimentais

### Automação Inteligente
- Rotinas de estudo automáticas
- Ajustes baseados em performance
- Recomendações proativas
- Otimização contínua

## Dicas para Usuários Avançados:

1. **Experimente diferentes modos** de interação
2. **Use dados para orientar** seu aprendizado
3. **Participe ativamente** da comunidade
4. **Contribua com feedback** para melhorar a plataforma
5. **Explore integrações** com suas ferramentas favoritas
6. **Defina metas ambiciosas** mas alcançáveis
7. **Monitore métricas avançadas** regularmente
        `,
        exercises: [
          {
            id: '1',
            question: 'O que a análise de sentimentos da Teacher Poli pode detectar?',
            options: [
              'Apenas erros gramaticais',
              'Nível de confiança e padrões emocionais',
              'Apenas velocidade de fala',
              'Somente vocabulário usado'
            ],
            correctAnswer: 1,
            explanation: 'A análise de sentimentos detecta seu nível de confiança, áreas de frustração, momentos de progresso e padrões emocionais durante o aprendizado.'
          },
          {
            id: '2',
            question: 'Quais cenários podem ser simulados na Teacher Poli?',
            options: [
              'Apenas conversas casuais',
              'Somente situações de trabalho',
              'Entrevistas, apresentações, viagens, negociações e conversas casuais',
              'Apenas situações de viagem'
            ],
            correctAnswer: 2,
            explanation: 'A Teacher Poli pode simular diversos cenários: entrevistas de emprego, apresentações profissionais, conversas casuais, situações de viagem e negociações comerciais.'
          },
          {
            id: '3',
            question: 'O que inclui o modo especialista?',
            options: [
              'Apenas interface diferente',
              'Interface avançada, controles granulares e estatísticas detalhadas',
              'Somente mais exercícios',
              'Apenas configurações básicas'
            ],
            correctAnswer: 1,
            explanation: 'O modo especialista oferece interface avançada, controles granulares, estatísticas detalhadas e configurações experimentais para usuários experientes.'
          }
        ],
        completed: false
      }
    ]
  },
  {
    id: 'stress-pronunciation',
    title: 'Curso Stress in Pronunciation',
    description: 'Conteúdo complementar para aprofundar seus estudos e aprender como os nativos realmente falam',
    type: 'course',
    thumbnail: 'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=800',
    totalLessons: 8,
    totalDuration: '4h 15min',
    rating: 4.9,
    downloads: 890,
    lessons: [
      {
        id: '1',
        title: 'Introduction to Word Stress',
        description: 'Understanding the basics of English word stress',
        videoUrl: 'https://www.youtube.com/embed/mttHTuEK5Xs',
        duration: '20:30',
        textContent: `
# Introduction to Word Stress

## What is Word Stress?

Word stress is the emphasis placed on certain syllables within words. In English, this is crucial for:
- **Clarity**: Making your speech understandable
- **Natural Flow**: Sounding like a native speaker
- **Meaning**: Sometimes stress changes word meaning

## Why is Word Stress Important?

### 1. Communication Clarity
- Incorrect stress can make words unrecognizable
- Native speakers rely on stress patterns to understand
- Proper stress improves listening comprehension

### 2. Natural Rhythm
- English has a natural rhythm based on stress
- Stressed syllables are longer and clearer
- Unstressed syllables are shorter and weaker

### 3. Meaning Differentiation
Some words change meaning based on stress:
- **RE-cord** (noun) vs **re-CORD** (verb)
- **CON-tent** (noun) vs **con-TENT** (adjective)

## Basic Stress Patterns:

### Two-Syllable Words
- **Nouns**: Usually first syllable (TA-ble, WIN-dow)
- **Verbs**: Usually second syllable (be-GIN, for-GET)
- **Adjectives**: Usually first syllable (HAP-py, EA-sy)

### Three-Syllable Words
- Often stress the first syllable (EL-e-phant)
- Sometimes the second (com-PU-ter)
- Rarely the third (em-ploy-EE)

## Practice Tips:

1. **Listen actively** to native speakers
2. **Mark stress** in new vocabulary
3. **Practice with rhythm** exercises
4. **Record yourself** and compare
5. **Use stress in context** not isolation
        `,
        exercises: [
          {
            id: '1',
            question: 'Where is the stress typically placed in two-syllable nouns?',
            options: [
              'Second syllable',
              'First syllable',
              'Both syllables equally',
              'It varies randomly'
            ],
            correctAnswer: 1,
            explanation: 'Two-syllable nouns typically have stress on the first syllable, like TA-ble, WIN-dow, and PEN-cil.'
          },
          {
            id: '2',
            question: 'What happens when stress is placed incorrectly?',
            options: [
              'Nothing significant',
              'Words may become unrecognizable',
              'Grammar becomes wrong',
              'Vocabulary is reduced'
            ],
            correctAnswer: 1,
            explanation: 'Incorrect word stress can make words unrecognizable to native speakers, significantly impacting communication clarity.'
          },
          {
            id: '3',
            question: 'Which pair shows stress affecting meaning?',
            options: [
              'happy - happiness',
              'record (noun) - record (verb)',
              'table - tables',
              'begin - beginning'
            ],
            correctAnswer: 1,
            explanation: 'RE-cord (noun) vs re-CORD (verb) is a classic example where stress placement changes the word\'s meaning and part of speech.'
          }
        ],
        completed: false
      },
      {
        id: '2',
        title: 'Sentence Stress Patterns',
        description: 'How stress works in complete sentences',
        videoUrl: 'https://www.youtube.com/embed/-6J-tNXZkQc',
        duration: '25:15',
        textContent: `
# Sentence Stress Patterns

## Understanding Sentence Stress

Sentence stress is about emphasizing the most important words in a sentence. This creates the natural rhythm of English.

## Content vs Function Words:

### Content Words (Usually Stressed)
- **Nouns**: book, teacher, computer
- **Main Verbs**: run, study, create
- **Adjectives**: beautiful, difficult, important
- **Adverbs**: quickly, carefully, often
- **Question Words**: what, where, when, how

### Function Words (Usually Unstressed)
- **Articles**: a, an, the
- **Prepositions**: in, on, at, for
- **Pronouns**: he, she, it, they
- **Auxiliary Verbs**: is, are, have, will
- **Conjunctions**: and, but, or

## Sentence Stress Rules:

### Rule 1: New Information
Stress words that provide new or important information:
- "I bought a **CAR** yesterday."
- "The **RED** car is mine."

### Rule 2: Contrast
Stress words that show contrast or correction:
- "I said **BLUE**, not green."
- "**SHE** did it, not him."

### Rule 3: Emphasis
Stress words for emotional emphasis:
- "That's **AMAZING**!"
- "I **LOVE** this song!"

## Common Patterns:

### Statement Pattern
- Subject + Verb + **OBJECT**
- "I like **COFFEE**."
- "She studies **ENGLISH**."

### Question Pattern
- **QUESTION WORD** + auxiliary + subject + verb
- "**WHERE** do you live?"
- "**WHAT** are you doing?"

### Negative Pattern
- Subject + auxiliary + **NOT** + verb
- "I do **NOT** agree."
- "She is **NOT** coming."

## Practice Techniques:

### 1. Clapping Method
- Clap on stressed syllables
- Keep steady rhythm
- Feel the natural beat

### 2. Humming Technique
- Hum the sentence melody
- Notice pitch changes
- Stressed syllables are higher

### 3. Exaggeration Practice
- Over-stress important words
- Make rhythm very obvious
- Gradually make it more natural

## Advanced Concepts:

### Thought Groups
Break long sentences into meaningful chunks:
- "When I get home / I'm going to cook dinner."
- "If it rains tomorrow / we'll stay inside."

### Focus Words
The most important word in each thought group:
- "I **LOVE** chocolate ice cream."
- "The meeting is at **THREE** o'clock."

### Rhythm Patterns
English follows stress-timed rhythm:
- Stressed syllables occur at regular intervals
- Unstressed syllables are compressed between them
- This creates English's characteristic "bounce"
        `,
        exercises: [
          {
            id: '1',
            question: 'Which types of words are usually stressed in sentences?',
            options: [
              'Articles and prepositions',
              'Pronouns and auxiliary verbs',
              'Nouns, main verbs, adjectives, and adverbs',
              'Conjunctions and articles'
            ],
            correctAnswer: 2,
            explanation: 'Content words (nouns, main verbs, adjectives, adverbs) carry the main meaning and are usually stressed, while function words are typically unstressed.'
          },
          {
            id: '2',
            question: 'When do we stress words for contrast?',
            options: [
              'In every sentence',
              'When correcting or showing difference',
              'Only in questions',
              'Never in normal speech'
            ],
            correctAnswer: 1,
            explanation: 'We stress words for contrast when correcting someone or showing a difference, like "I said BLUE, not green."'
          },
          {
            id: '3',
            question: 'What is a "thought group"?',
            options: [
              'A group of people thinking',
              'A meaningful chunk of a sentence',
              'A grammar rule',
              'A type of question'
            ],
            correctAnswer: 1,
            explanation: 'A thought group is a meaningful chunk of a sentence that expresses one complete idea, helping organize speech rhythm.'
          }
        ],
        completed: false
      }
      // Adicionar mais lições conforme necessário...
    ]
  },
  {
    id: 'apa-method',
    title: 'Entendendo e Aplicando o Método APA',
    description: 'Descubra como aplicar o método APA na sua jornada de aprendizado com a Teacher Poli',
    type: 'guide',
    thumbnail: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
    totalLessons: 6,
    totalDuration: '3h 20min',
    rating: 4.7,
    downloads: 1100,
    lessons: [
      {
        id: '1',
        title: 'O que é o Método APA',
        description: 'Introdução aos fundamentos do método',
        videoUrl: 'https://www.youtube.com/embed/povotikiPeg',
        duration: '18:45',
        textContent: `
# O Método APA: Revolucionando o Aprendizado de Inglês

## O que significa APA?

**A**daptive **P**ersonalized **A**pproach - Uma abordagem adaptativa e personalizada para o ensino de inglês.

## Princípios Fundamentais:

### 1. Adaptação Contínua
- O método se ajusta constantemente ao seu progresso
- Identifica suas dificuldades em tempo real
- Modifica estratégias baseado em seu desempenho
- Personaliza conteúdo para suas necessidades específicas

### 2. Personalização Profunda
- Considera seu estilo de aprendizagem único
- Adapta-se aos seus interesses pessoais
- Respeita seu ritmo individual
- Incorpora seus objetivos específicos

### 3. Abordagem Holística
- Integra todas as habilidades linguísticas
- Conecta aprendizado com contexto real
- Desenvolve competência comunicativa completa
- Foca na aplicação prática

## Como o APA Funciona:

### Fase 1: Diagnóstico Inteligente
- Avaliação inicial abrangente
- Identificação de pontos fortes e fracos
- Mapeamento de preferências de aprendizagem
- Definição de objetivos personalizados

### Fase 2: Planejamento Dinâmico
- Criação de roteiro personalizado
- Seleção de atividades adequadas
- Definição de marcos de progresso
- Estabelecimento de cronograma flexível

### Fase 3: Execução Adaptativa
- Implementação de atividades personalizadas
- Monitoramento contínuo do progresso
- Ajustes em tempo real
- Feedback imediato e construtivo

### Fase 4: Avaliação e Refinamento
- Análise regular do desempenho
- Identificação de novas necessidades
- Refinamento de estratégias
- Evolução contínua do plano

## Diferenças do Método Tradicional:

### Método Tradicional:
- Abordagem única para todos
- Ritmo fixo e inflexível
- Foco em gramática isolada
- Avaliação padronizada

### Método APA:
- Abordagem única para cada pessoa
- Ritmo adaptável e flexível
- Foco em comunicação contextualizada
- Avaliação personalizada e contínua

## Benefícios Comprovados:

### 1. Eficiência Aumentada
- Redução de 40% no tempo de aprendizado
- Maior retenção de conteúdo
- Progresso mais consistente
- Menos frustração e desistência

### 2. Motivação Sustentada
- Conteúdo sempre relevante
- Desafios adequados ao nível
- Reconhecimento de progresso
- Conexão com interesses pessoais

### 3. Resultados Duradouros
- Aprendizado mais profundo
- Melhor transferência para situações reais
- Desenvolvimento de autonomia
- Habilidades metacognitivas aprimoradas

## Aplicação Prática:

### No Vocabulário:
- Palavras selecionadas por relevância pessoal
- Contextos baseados em seus interesses
- Repetição espaçada personalizada
- Associações significativas

### Na Gramática:
- Regras apresentadas quando necessárias
- Exemplos do seu contexto de vida
- Prática em situações reais
- Correção contextualizada

### Na Conversação:
- Tópicos de seu interesse
- Situações relevantes para você
- Nível de complexidade adequado
- Feedback personalizado

### Na Compreensão:
- Materiais adaptados ao seu nível
- Temas de seu interesse
- Velocidade ajustada
- Suporte contextual personalizado
        `,
        exercises: [
          {
            id: '1',
            question: 'O que significa a sigla APA no contexto do método de ensino?',
            options: [
              'Advanced Practical Application',
              'Adaptive Personalized Approach',
              'Automatic Progressive Assessment',
              'Active Participatory Activities'
            ],
            correctAnswer: 1,
            explanation: 'APA significa Adaptive Personalized Approach - uma abordagem adaptativa e personalizada que se ajusta continuamente às necessidades individuais de cada aluno.'
          },
          {
            id: '2',
            question: 'Qual é a principal diferença entre o método APA e métodos tradicionais?',
            options: [
              'APA usa mais tecnologia',
              'APA é mais caro',
              'APA personaliza para cada indivíduo, enquanto métodos tradicionais usam abordagem única',
              'APA só funciona online'
            ],
            correctAnswer: 2,
            explanation: 'A principal diferença é que o método APA personaliza completamente a experiência para cada indivíduo, enquanto métodos tradicionais aplicam a mesma abordagem para todos os alunos.'
          },
          {
            id: '3',
            question: 'Quantas fases tem o processo do método APA?',
            options: [
              '2 fases',
              '3 fases',
              '4 fases',
              '5 fases'
            ],
            correctAnswer: 2,
            explanation: 'O método APA tem 4 fases: Diagnóstico Inteligente, Planejamento Dinâmico, Execução Adaptativa e Avaliação e Refinamento.'
          }
        ],
        completed: false
      }
      // Adicionar mais lições conforme necessário...
    ]
  }
];