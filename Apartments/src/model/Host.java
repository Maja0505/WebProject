package model;

import java.util.List;

public class Host extends User {
	
	private List<Apartment> apartmentsForRent;	
	
	public Host(List<Apartment> apartmentsForRent) {
		super();
		this.apartmentsForRent = apartmentsForRent;
	}

	public List<Apartment> getApartmentsForRent() {
		return apartmentsForRent;
	}

	public void setApartmentsForRent(List<Apartment> apartmentsForRent) {
		this.apartmentsForRent = apartmentsForRent;
	}
	
}
