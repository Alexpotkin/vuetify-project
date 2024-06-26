<template>
	<v-dialog v-model="modalOpened" persistent max-width="400">
		<v-card>
			<v-card-title>Registration</v-card-title>
			<v-card-text>
				<v-text-field
					v-model="nameClient"
					label="Name"
					@input="checkFields"
					required
				></v-text-field>
				<v-text-field
					v-model="groupClient"
					label="Group1"
					@input="checkFields"
					required
				></v-text-field>
				<v-text-field
					v-model="registrationResult"
					label="Registration Result"
					readonly
					v-if="showResult"
				></v-text-field>
				<v-text-field
					v-model="errorData"
					label="Server:"
					readonly
					v-if="showError"
				></v-text-field>
			</v-card-text>
			<v-card-actions>
				<v-btn @click="addEntry" :disabled="loading || !fieldsValid">
					<v-progress-circular
						v-if="loading"
						indeterminate
						color="black"
						size="20"
						class="mr-2"
					></v-progress-circular>
					Add
				</v-btn>
				<v-btn @click="closeModal">Cancel</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import axios from 'axios'

export default {
	name: 'RegistrationModal',
	data() {
		return {
			modalOpened: false,
			nameClient: '',
			groupClient: '',
			showResult: false,
			showError: false,
			registrationResult: '',
			errorData: '',
			fieldsValid: false,
			loading: false,
		}
	},
	methods: {
		openModal() {
			this.modalOpened = true
		},
		clearFields() {
			this.nameClient = ''
			this.groupClient = ''
			this.registrationResult = ''
			this.errorData = ''
			this.showResult = false
			this.showError = false
		},
		checkFields() {
			this.fieldsValid =
				this.nameClient.trim() !== '' && this.groupClient.trim() !== ''
		},
		fetchRegistration() {
			const requestData = { name: this.nameClient, group: this.groupClient }
			this.loading = true
			axios
				.post('http://crm.kassa-plus.ru:50000/registration', requestData)
				.then(response => {
					if (response.data.status === 'Ok') {
						this.registrationResult = response.data.message
						this.showResult = true
						this.showError = false
					} else if (response.data.status === 'error') {
						this.errorData = response.data.message
						this.showResult = false
						this.showError = true
					}
					setTimeout(() => {
						this.loading = false
					}, 2000)
				})
				.catch(error => {
					this.errorData = 'An error occurred while processing your request.'
					this.showResult = false
					this.showError = true
					this.loading = false
					console.error('Error', error.response?.data, error.message)
				})
		},
		closeModal() {
			this.modalOpened = false
			this.clearFields()
		},
		addEntry() {
			this.loading = true
			this.fetchRegistration()
		},
	},
}
</script>
