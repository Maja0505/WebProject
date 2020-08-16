package beans;

import java.awt.Image;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import enums.StatusOfApartment;
import enums.TypeOfApartment;

public class Apartment {
	private String id;
	private TypeOfApartment typeOfApartment;
	private int numberOfRooms;
	private int numberOfGuests;
	private Location location;
	private List<Date> dateOfIssue;
	private List<Date> availabilityByDates;
	@JsonIgnoreProperties({"password","firstName","lastName","gender","typeOfUser","apartmentsForRent"})
	private Host host;
	@JsonIgnoreProperties({"apartment","guest","rate","text"})
	private List<Comment> comments;
	private List<Image> images;
	private int pricePerNight;
	private String checkInTime;
	private String checkOutTime;
	private StatusOfApartment statusOfApartment;
	private List<Amenities> amenities;
	@JsonIgnoreProperties({"apartment","startDateOfReservation","numberOfNights","fullPrice","reservationMessage"})
    private List<Reservation> reservations;
	private int flag;
    
	public Apartment() {
		
	}

	public Apartment(String id,TypeOfApartment typeOfApartment, int numberOfRooms, int numberOfGuests, Location location,
			List<Date> dateOfIssue, List<Date> availabilityByDates, Host host, List<Comment> comments,
			List<Image> images, int pricePerNight, String checkInTime, String checkOutTime,
			StatusOfApartment statusOfApartment, List<Amenities> amenities, List<Reservation> reservations) {
		super();
		this.id = id;
		this.typeOfApartment = typeOfApartment;
		this.numberOfRooms = numberOfRooms;
		this.numberOfGuests = numberOfGuests;
		this.location = location;
		this.dateOfIssue = dateOfIssue;
		this.availabilityByDates = availabilityByDates;
		this.host = host;
		this.comments = comments;
		this.images = images;
		this.pricePerNight = pricePerNight;
		this.checkInTime = checkInTime;
		this.checkOutTime = checkOutTime;
		this.statusOfApartment = statusOfApartment;
		this.amenities = amenities;
		this.reservations = reservations;
		this.flag = 0;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public TypeOfApartment getTypeOfApartment() {
		return typeOfApartment;
	}

	public void setTypeOfApartment(TypeOfApartment typeOfApartment) {
		this.typeOfApartment = typeOfApartment;
	}

	public int getNumberOfRooms() {
		return numberOfRooms;
	}

	public void setNumberOfRooms(int numberOfRooms) {
		this.numberOfRooms = numberOfRooms;
	}

	public int getNumberOfGuests() {
		return numberOfGuests;
	}

	public void setNumberOfGuests(int numberOfGuests) {
		this.numberOfGuests = numberOfGuests;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public List<Date> getDateOfIssue() {
		return dateOfIssue;
	}

	public void setDateOfIssue(List<Date> dateOfIssue) {
		this.dateOfIssue = dateOfIssue;
	}

	public List<Date> getAvailabilityByDates() {
		return availabilityByDates;
	}

	public void setAvailabilityByDates(List<Date> availabilityByDates) {
		this.availabilityByDates = availabilityByDates;
	}

	public Host getHost() {
		return host;
	}

	public void setHost(Host host) {
		this.host = host;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public List<Image> getImages() {
		return images;
	}

	public void setImages(List<Image> images) {
		this.images = images;
	}

	public int getPricePerNight() {
		return pricePerNight;
	}

	public void setPricePerNight(int pricePerNight) {
		this.pricePerNight = pricePerNight;
	}

	public String getCheckInTime() {
		return checkInTime;
	}

	public void setCheckInTime(String checkInTime) {
		this.checkInTime = checkInTime;
	}

	public String getCheckOutTime() {
		return checkOutTime;
	}

	public void setCheckOutTime(String checkOutTime) {
		this.checkOutTime = checkOutTime;
	}

	public StatusOfApartment getStatusOfApartment() {
		return statusOfApartment;
	}

	public void setStatusOfApartment(StatusOfApartment statusOfApartment) {
		this.statusOfApartment = statusOfApartment;
	}

	public List<Amenities> getAmenities() {
		return amenities;
	}

	public void setAmenities(List<Amenities> amenities) {
		this.amenities = amenities;
	}

	public List<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(List<Reservation> reservations) {
		this.reservations = reservations;
	}

	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}
	
	
	
	
	
}
