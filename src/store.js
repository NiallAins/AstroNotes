import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		notes : [
			{
				date: 1494943200000,
				title: 'The Basics Of Western Astrology',
				content: 'Astrology is the study of the movements and relative positions of celestial objects as a means of divining information about human affairs and terrestrial events. Astrology has been dated to at least the 2nd millennium BCE, and has its roots in calendrical systems used to predict seasonal shifts and to interpret celestial cycles as signs of divine communications'
			},
			{
				date: 1498896000000,
				title: 'Religion and Science',
				content: 'Various aspects of the relationship between religion and science have been cited by modern historians of science and religion, philosophers, theologians, scientists, and others from various geographical regions and cultures. Even though the ancient and medieval worlds did not have conceptions resembling the modern understandings of "science" and "religion", certain elements of these modern ideas are found throughout history'
			},
			{
				date: 1510486200000,
				title: 'Comment On The Importance of Stories',
				content: 'Stories play a vital role in the growth and development of children. The books they read and the characters they get to know can become like friends. It’s also good for children to understand that books are a useful source of information and that good reading skills are important for success in their future lives. Reading also helps children with their confidence levels, coping with feelings and language and learning.'
			},
			{
				date: 1500666000000,
				title: 'Vampires: The Romantic Ideaology',
				content: 'The vampire or revenant first appeared in poems such as The Vampire (1748) by Heinrich August Ossenfelder, Lenore (1773) by Gottfried August Bürger, Die Braut von Corinth (The Bride of Corinth) (1797) by Johann Wolfgang von Goethe, Robert Southey\'s Thalaba the Destroyer (1801), John Stagg\'s "The Vampyre" (1810), Percy Bysshe Shelley\s "The Spectral Horseman" (1810) ("Nor a yelling vampire reeking with gore") and "Ballad" in St. Irvyne (1811) about a reanimated corpse, Sister Rosa, Samuel Taylor Coleridge\'s unfinished Christabel and Lord Byron\'s The Giaour.'
			},
			{
				date: 1494156240000,
				title: 'Peace On Earth A Wonderful Wish',
				content: 'World peace, or peace on Earth, is the concept of an ideal state of happiness, freedom and peace within and among all people and nations on earth. This idea of world non-violence is one motivation for people and nations to willingly cooperate, either voluntarily or by virtue of a system of governance that objects warfare.'
			}
		]
	},
	mutations: {
		addNote: function(state) {
			state.notes.push({
				date: new Date().valueOf(),
				title: '',
				content: ''
			});
		},
		deleteNote: function(state, index) {
			state.notes.splice(index, 1);
		}
	},
});
