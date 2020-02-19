<template lang="pug">
    .quiz
        .quiz-intro(v-if='progressIndex === 0')
            h2.quiz-intro__title(v-html='intro.title')

            .quiz-intro__content(v-html='intro.content')

            button.quiz-intro__start(type='button', aria-label='Start', @click.prevent='clickStart') {{controls.start}}

        .quiz-questions(v-if='progressIndex !== 0 && progressIndex !== questions.length + 1')
            transition
                .quiz-question(
                    v-for='(questionItem, questionIndex) in questions',
                    :key='questionIndex', v-if='progressIndex === questionIndex + 1'
                    )
                    h3.quiz-question__title(v-html='questionItem.title')

                    .quiz-question__answers
                        .quiz-question__answer(
                            v-for='(answerItem, answerIndex) in questionItem.answers',
                            :key='answerIndex'
                            )
                            input.quiz-question__input(
                                :type='questionItem.isMultiple ? "checkbox" : "radio"',
                                :name='questionItem.isMultiple ? "q" + questionIndex + "a" + answerIndex :  "q" + questionIndex',
                                :id='"q" + questionIndex + "a" + answerIndex',
                                :value='"q" + questionIndex + "a" + answerIndex',
                                v-model='userAnswers[questionIndex]'
                                )
                            label.quiz-question__label(
                                :for='"q" + questionIndex + "a" + answerIndex',
                                v-html='answerItem.content'
                                )

                    button.quiz-question__next(type='button', aria-label='Next', @click.prevent='clickNext') {{controls.next}}

        .quiz-results(v-if='progressIndex === questions.length + 1')
            h3.quiz-results__title(v-html='results.title')

            .quiz-result
                h2.quiz-result__title(v-html='result.title')
                .quiz-result__content(v-html='result.content')

            Share.quiz-results__share(:url='result.url', :title='result.title', :description='result.content')

            button.quiz-results__restart(type='button', aria-label='Restart', @click='clickRestart') {{controls.restart}}

</template>

<script>
const Share = () => import('@/components/Share.vue');
import meta from '@/assets/data/meta.json';

export default {
    name: 'Quiz',

    components: {
        Share
    },

    data() {
        return {
            progressIndex: 0,

            userResult: 0,

            controls: {
                start: 'Start Quiz',
                prev: 'Prev',
                next: 'Next',
                restart: 'Restart Quiz'
            },

            intro: {
                title: 'Quiz Intro',
                content: 'Start this shit'
            },

            questions: [
                {
                    title: 'Question 1?',
                    isMultiple: false,
                    answers: [
                        {
                            content: 'Answer 1',
                            result: 0
                        },
                        {
                            content: 'Answer 2',
                            result: 0
                        },
                        {
                            content: 'Answer 3',
                            result: 1
                        }
                    ]
                },
                {
                    title: 'Question 2?',
                    isMultiple: true,
                    answers: [
                        {
                            content: 'Answer 1',
                            result: 0
                        },
                        {
                            content: 'Answer 2',
                            result: 0
                        },
                        {
                            content: 'Answer 3',
                            result: 1
                        },
                        {
                            content: 'Answer 4',
                            result: 1
                        }
                    ]
                }
            ],

            results: {
                title: 'Quiz Result',
                items: [
                    {
                        from: 0,
                        to: 1,
                        title: 'Result 1',
                        content: 'From 0 to 1'
                    },
                    {
                        from: 1,
                        to: 3,
                        title: 'Result 2',
                        content: 'From 1 to 3'
                    },
                    {
                        from: 3,
                        to: 6,
                        title: 'Result 3',
                        content: 'From 3 to 6'
                    }
                ]
            }
        };
    },

    computed: {
        userAnswers() {
            return Array.from(Array(this.questions.length), (item, index) => (this.questions[index].isMultiple ? [] : 0));
        },

        result() {
            const score = {
                url: '',
                title: '',
                content: ''
            };
            this.results.items.forEach(({from, to, title, content}, index) => {
                if (this.userResult >= from && this.userResult < to) {
                    score.url = `${meta.url}share/share${index}.html`;
                    score.title = title;
                    score.content = content;
                }
            });

            return score;
        }
    },

    methods: {
        clickStart() {
            this.progressIndex = 1;
        },

        clickNext() {
            this.progressIndex++;

            this.calculateResults();
        },

        clickRestart() {
            this.progressIndex = 0;
            this.userResult = 0;
        },

        calculateResults() {
            this.userAnswers.forEach(item => {
                const calculateAnswer = answer => {
                    const qIndex = answer.indexOf('q');
                    const aIndex = answer.indexOf('a');

                    const questionIndex = parseInt(answer.substring(qIndex + 1, aIndex));
                    const answerIndex = parseInt(answer.substring(aIndex + 1));

                    this.userResult += this.questions[questionIndex].answers[answerIndex].result;
                };

                if (Array.isArray(item)) {
                    item.forEach(subitem => {
                        calculateAnswer(subitem);
                    });
                } else {
                    calculateAnswer(item);
                }
            });
        }
    }
};
</script>

<style lang="scss">
.quiz {
    margin: 0;
    padding: 0;
    border: 1px solid;

    &-intro {
        margin: 0;

        &__title {
            font-weight: 700;
        }

        &__start {
            border: 1px solid;
        }
    }

    &-questions {
        margin: 0;
    }

    &-question {
        margin: 0;

        &__title {
            margin: 0;
            font-weight: 700;
        }

        &__answers {
            margin: 0;
        }

        &__answer {
            position: relative;
            margin: 0;
        }

        &__input {
            position: absolute;
            top: 0;
            left: 0;
            margin: 0;
        }

        &__label {
            margin: 0;
        }

        &__next {
            margin: 0;
            border: 1px solid;
        }
    }

    &-results {
        margin: 0;

        &__restart {
            border: 1px solid;
        }
    }

    &-result {
        margin: 0;

        &__title {
            font-weight: 700;
        }

        &__content {
            margin: 0;
        }
    }
}
</style>
