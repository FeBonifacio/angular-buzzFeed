import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz-questions.json";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title: string= "" //Titulo

  questions: any //Any para facilitar a "ligação" pegar os dados do banco
  questionSelected: any // pegar a qest selecionada

  answers: string[] = []
  answerSelected: string = ""

  questionIndex: number = 0
  questionMaxIndex: number = 0

  finished: boolean = false

  constructor() { }

  ngOnInit(): void {
    //Verificar se está aparecendo as infos
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }
  }

  playerChoose(value: string) {
    this.answers.push(value)
    this.nextStep()
  }

  //Função para ir pra proxima qstao ou dar o resultado final
  async nextStep() {
    this.questionIndex+=1

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }

  // Ver qual foi mais escolhido
  async checkResult(anwsers:string[]) {
    const result = anwsers.reduce((previous, current, i, arr) => {
      if (arr.filter(item => item === previous).length > arr.filter(item => item === current).length) {
        return previous
      } else {
        return current
      }
    })

    return result
  }

}
