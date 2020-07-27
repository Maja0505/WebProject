package dto;

import java.util.List;

import beans.Apartment;

public class HostDTO {
	
	public String username;
	public List<Apartment> apartmentsForRent;
	
	public HostDTO() {
		super();
	}
	
	public HostDTO(String username, List<Apartment> apartmentsForRent) {
		this.username = username;
		this.apartmentsForRent = apartmentsForRent;
	}
	
}
