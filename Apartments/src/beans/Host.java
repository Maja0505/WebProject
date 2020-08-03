package beans;

import java.util.List;

import enums.Gender;
import enums.TypeOfUser;

public class Host extends User {
	
	private List<Apartment> apartmentsForRent;	
	
	public Host() {
		super();
	}
	
	public Host(String username, String password, String firstName, String lastName, Gender gender,
			TypeOfUser typeOfUser,List<Apartment> apartmentsForRent) {
		super(username,password,firstName,lastName,gender,typeOfUser);
		this.apartmentsForRent = apartmentsForRent;
	}

	public List<Apartment> getApartmentsForRent() {
		return apartmentsForRent;
	}

	public void setApartmentsForRent(List<Apartment> apartmentsForRent) {
		this.apartmentsForRent = apartmentsForRent;
	}
	
}
