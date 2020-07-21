package model;

public class Comment {

		private Guest guest;
		//dodaj Apartman i getere i seter i ubaci u konstruktor
		private String text;
		private int rate;
		
		public Comment() {
		}

		public Comment(Guest guest, String text, int rate) {
			super();
			this.guest = guest;
			this.text = text;
			this.rate = rate;
		}

		public Guest getGuest() {
			return guest;
		}

		public void setGuest(Guest guest) {
			this.guest = guest;
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
