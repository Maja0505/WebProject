package beans;

import java.util.List;

import enums.Gender;
import enums.TypeOfUser;

public class Guest extends User {
	
	private List<Apartment> rentedApartments;
	private List<Reservation> reservations;
	
	public Guest(String username, String password, String firstName, String lastName, Gender gender,
			TypeOfUser typeOfUser,List<Apartment> rentedApartments, List<Reservation> reservations) {
		super(username,password,firstName,lastName,gender,typeOfUser);
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
