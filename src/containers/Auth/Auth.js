import React, {Component} from 'react'
import classes from './Auth.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'

export default class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'email',
                errorMessage: 'Ведите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Ведите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = () => {

    }

    registerHandler() {

    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    validateControl = (value, validation) => {
        if (!validation) {
            return true
        }
        let isValid = true
        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = is.email(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}
        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control
        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })
        this.setState({formControls, isFormValid})
    }

    renderInput () {
        return Object.keys(this.state.formControls).map((controlNmae, index) => {
            const control = this.state.formControls[controlNmae]
            return (
                <Input
                    key={controlNmae + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlNmae)}
                />
            )
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                <h1>Авторизация</h1>
                <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                    {this.renderInput()}
                    <Button
                        type='success'
                        onClick={this.loginHandler}
                        disabled={!this.state.isFormValid}
                    >Войти</Button>

                    <Button
                        type='primary'
                        onClick={this.registerHandler}
                    >Регистрация</Button>
                </form>
                </div>
            </div>
        )
    }
}