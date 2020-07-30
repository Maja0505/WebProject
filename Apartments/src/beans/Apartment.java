package beans;

import java.awt.Image;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import enums.StatusOfApartment;
import enums.TypeOfApartment;

public class Apartment {
	private int id;
	private TypeOfApartment typeOfApartment;
	private int numberOfRooms;
	private int numberOfGuests;
	private Location location;
	private List<Date> dateOfIssue;
	private List<Date> availabilityByDates;
	@JsonIgnoreProperties({"password","firstName","lastName","gender","typeOfUser","apartmentsForRent"})
	private Host host;
	private List<Comment> comments;
	private List<Image> images;
	private Double pricePerNight;
	private Date checkInTime;
	private Date checkOutTime;
	private StatusOfApartment statusOfApartment;
	private List<Amenities> amenities;
	@JsonIgnoreProperties({"apartment","startDateOfReservation","numberOfNights","fullPrice","reservationMessage","guest","statusOfReservation"})
    private List<Reservation> reservations;
    
	public Apartment() {
		
	}

	public Apartment(int id,TypeOfApartment typeOfApartment, int numberOfRooms, int numberOfGuests, Location location,
			List<Date> dateOfIssue, List<Date> availabilityByDates, Host host, List<Comment> comments,
			List<Image> images, Double pricePerNight, Date checkInTime, Date checkOutTime,
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
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
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

	public Double getPricePerNight() {
		return pricePerNight;
	}

	public void setPricePerNight(Double pricePerNight) {
		this.pricePerNight = pricePerNight;
	}

	public Date getCheckInTime() {
		return checkInTime;
	}

	public void setCheckInTime(Date checkInTime) {
		this.checkInTime = checkInTime;
	}

	public Date getCheckOutTime() {
		return checkOutTime;
	}

	public void setCheckOutTime(Date checkOutTime) {
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
	
	
	
	
	
}
