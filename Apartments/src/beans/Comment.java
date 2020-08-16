package beans;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class Comment {
		private String id;
		@JsonIgnoreProperties({"password","firstName","lastName","gender","typeOfUser","rentedApartments","reservations"})
		private Guest guest;
		@JsonIgnoreProperties({"typeOfApartment","numberOfRooms","numberOfGuests","location","dateOfIssue","availabilityByDates","host","comments","images","pricePerNight","checkInTime","checkOutTime","statusOfApartment","amenities","reservations"})
		private Apartment apartment;
		private String text;
		private int rate;
		private boolean enable;
		private int flag;
		
		public Comment() {
			super();
		}

		public Comment(String id,Guest guest,Apartment apartment, String text, int rate,boolean enable) {
			super();
			this.id = id;
			this.guest = guest;
			this.apartment = apartment;
			this.text = text;
			this.rate = rate;
			this.enable = enable;
			this.flag = 0;
		}

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
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

		public boolean isEnable() {
			return enable;
		}

		public void setEnable(boolean enable) {
			this.enable = enable;
		}

		public int getFlag() {
			return flag;
		}

		public void setFlag(int flag) {
			this.flag = flag;
		}

		
		
}
