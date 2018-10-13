<template>
	<div
		id			="app"
		@click		="keyControl = false"
		@keydown.tab="keyControl = true"
		:class		="{ 'key-control': keyControl }"
	>
		<div
			class	="loader"
			:class	="{ open : loading }"
		>
			<img src="../public/logo.jpg">
		</div>

		<button
			class	="btn new-note"
			@click	="newNote()">
			New Note
		</button>

		<aside>
			<div
				v-for	="(note, i) in notes"
				:key	="i"
				class	="note-container"
				:class	="{
					'open' : currentNote === i && !openTransition,
					'opening' : currentNote === i && openTransition
				}"
				@click			="currentNote !== i ? toggleNote(i) : null"
				@keydown.enter	="currentNote !== i ? toggleNote(i) : null"
				:tabindex		="currentNote !== i ? 0 : -1"
			>
				<div
					class	="note"
					ref		="noteElement"
				>
					<button
						class		="icon"
						@click.stop	="currentNote === i ? toggleNote(i) : deletingNote = i"
					>
						×
					</button>
					<input
						class		="title"
						type		="text"
						v-model		="note.title"
						placeholder	="Note Title"
						@input		="newEdit = true"
						:tabindex	="currentNote === i ? 0 : -1"
					>
					<div class="date">
						{{ currentNote === i ? note.dateLong : note.dateShort }}
					</div>
					<textarea
						class	="content"
						v-if	="currentNote === i"
						v-model	="note.content"
						@input	="newEdit = true"
					></textarea>
				</div>
			</div>
		</aside>

		<div
			class	="dialog-bg"
			:class	="{ open : deletingNote !== -1 }"
			@click	="deletingNote = -1"
		></div>
		<div
			class="dialog"
			:class="{ open : deletingNote !== -1 }"
		>
			<p>
				Are you sure you want to delete this note?
			</p>
			<button
				ref		="deleteBtn"
				class	="btn sec"
				@click	="deleteNote()"
				:tabindex="deletingNote === -1 ? -1 : 0"
			>
				Delete
			</button>
			<button
				class	="btn"
				@click	="deletingNote = -1"
				:tabindex="deletingNote === -1 ? -1 : 0"
			>
				Cancel
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data: function() {
			return {
				currentNote:	-1,
				deletingNote:	-1,
				loading:		true,
				openTransition: false,
				newEdit:		false,
				keyControl:		false
			}
		},
		computed : {
			notes: function() {
				return this.$store.state.notes;
			}
		},
		created : function() {
			// If URL contains note title, open it
			if (this.$route.params.note) {
				let urlNote = this.$route.params.note.toLowerCase();
				this.currentNote = this.notes.findIndex(n =>
					this.toURLString(n.title) === urlNote
				);
			}

			this.notes.forEach((n, i) => this.addDates(i));

			// Mock data loading UI, as no backend curently exists
			setTimeout(() => this.loading = false, 1500);
		},
		methods: {
			/**
			 * Make a string URL safe
			 *	@param string: string - string to be converted
			 *	@return :string - URL safe string
			 */
			toURLString: function(string) {
				return string.replace(/ /g, '_').toLowerCase();
			},

			/**
			 * Open note, or close if already open
			 * @param note: number - index of note to open
			 */
			toggleNote: function(note) {
				if (this.openTransition) {
					return;
				}

				if (this.currentNote === -1) {
					this.animateNote(note);
					this.currentNote = note;
				} else {
					// Close and update current note first
					if (this.newEdit) {
						this.notes[this.currentNote].date = new Date().valueOf();
						this.addDates(this.currentNote);
						this.newEdit = false;
					}
					this.animateNote(this.currentNote);
					setTimeout(() => {
						if (note === this.currentNote) {
							this.currentNote = -1;
						} else {
							this.animateNote(note);
							this.currentNote = note;
						}
					}, 300);
				}

				this.$router.push({
					path: '/' + this.toURLString(this.notes[note].title)
				});
			},

			/**
			 * Animates a note open, or closed if already open
			 * @param note: number - index of note to animate
			 */
			animateNote: function(note) {
				let duration = note === this.currentNote ? 300 : 50;
				this.openTransition = true;
				let el = this.$refs.noteElement[note];
				el.style.top = Math.round(el.parentElement.getBoundingClientRect().top + 15) + 'px';
				setTimeout(() => {
					el.removeAttribute('style');
					this.openTransition = false;
				}, duration);
			},

			/**
			 * Add human readable date properties to a note
			 * @param note: string - index of note with no human readable dates
			 */
			addDates: function(note) {
				let noteObj = this.notes[note];
				let dateString = new Date(noteObj.date).toString();
				noteObj.dateShort = dateString.substring(4, 15);
				noteObj.dateLong = 'Last editied: ' + dateString.substring(0, 15) + ' at ' + dateString.substring(15, 21);
			},

			/**
			 * Create a new empty note and open it
			 */
			newNote: function() {
				this.$store.commit('addNote');
				let noteIndex = this.notes.length - 1;
				this.addDates(noteIndex);
				// Wait for DOM update
				this.$nextTick().then(() => this.toggleNote(noteIndex));
			},

			/**
			 * Open delete confirmation modal
			 * @param note: number - index of note to confirm deletion of
			 */
			openModal: function(note) {
				this.deletingNote = note;
				this.$refs.deleteBtn.focus();
			},

			/**
			 * Deletes the selected note
			 */
			deleteNote: function() {
				this.$store.commit('deleteNote', this.deletingNote);
				this.deletingNote = -1;
			}
		}
	}
</script>

<style lang="scss">
	@import './_variables';
	@import './_style';
</style>
