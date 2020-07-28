package beans;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class Comment {
		@JsonIgnoreProperties({"password","firstName","lastName","gender","typeOfUser","rentedApartments","reservations"})
		private Guest guest;
		
		@JsonIgnoreProperties({"comments","images","host"})
		private Apartment apartment;
		private String text;
		private int rate;
		
		public Comment() {
			super();
		}

		public Comment(Guest guest,Apartment apartment, String text, int rate) {
			super();
			this.guest = guest;
			this.apartment = apartment;
			this.text = text;
			this.rate = rate;
		}

		public Guest getGuest() {
			return guest;
		}

		public void setGuest(Guest guest) {
			this.guest = guest;
		}

		public Apartment getApartment() {
			return apartment;
		}

		public void setApartment(Apartment apartment) {
			this.apartment = apartment;
		}

		public String getText() {
			return text;
		}

		public void setText(String text) {
			this.text = text;
		}

		public int getRate() {
			return rate;
		}

		public void setRate(int rate) {
			this.rate = rate;
		}
		
}
