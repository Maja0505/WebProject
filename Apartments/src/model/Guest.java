package model;

import java.util.List;

public class Guest extends User {
	
	private List<Apartment> rentedApartments;
	private List<Reservation> reservations;
	
	public Guest(List<Apartment> rentedApartments, List<Reservation> reservations) {
		super();
		this.rentedApartments = rentedApartments;
		this.reservations = reservations;
	}

	public List<Apartment> getRentedApartments() {
		return rentedApartments;
	}

	public void setRentedApartments(List<Apartment> rentedApartments) {
		this.rentedApartments = rentedApartments;
	}

	public List<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(List<Reservation> reservations) {
		this.reservations = reservations;
	}
	
	
}
