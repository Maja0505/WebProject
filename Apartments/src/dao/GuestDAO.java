package dao;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.ServletContext;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import beans.Guest;
import beans.User;
import dto.GuestDTO;



public class GuestDAO {

	private HashMap<String, Guest> guests;
	private GenericCRUD<GuestDTO> genericCRUD = new GenericCRUD<GuestDTO>();
	
	public GuestDAO() {
		
	}
	
	public GuestDAO(String contexPath,ServletContext ctx) throws JsonParseException, JsonMappingException, IOException {
		List<GuestDTO> guestArrayDTO = genericCRUD.load(contexPath, GuestDTO.class);
		guests = new HashMap<>();
		UserDAO userDAO = (UserDAO) ctx.getAttribute("users");
		Collection<User> users = userDAO.allUsers();
		for (GuestDTO guestDTO : guestArrayDTO) {
			for(User user : users) {
				if(user.getUsername().equals(guestDTO.username)) {
					Guest guest = new Guest(user.getUsername(), user.getPassword(), user.getFirstName(), user.getLastName(), user.getGender(), user.getTypeOfUser(), guestDTO.apartments, guestDTO.reservations);
					guests.put(guest.getUsername(), guest);
					break;
				}
			
			}
		
			
		}

	}
	
	public void save(Collection<Guest> allGuests,Guest newGuest,String path) throws JsonGenerationException, JsonMappingException, IOException {
		Collection<GuestDTO> guestsDTO = new LinkedList<GuestDTO>();
		for (Guest guest : allGuests) {
			guestsDTO.add(new GuestDTO(guest.getUsername(),guest.getRentedApartments(),guest.getReservations()));
		}
		genericCRUD.saveAll(guestsDTO, path);
		guests.put(newGuest.getUsername(), newGuest);
	}
	
	public void update(Guest guest,String path) throws JsonGenerationException, JsonMappingException, IOException {
		HashMap<String, GuestDTO> guestsDTO = new HashMap<String, GuestDTO>();
		for(Guest g : allGuests()) {
			guestsDTO.put(g.getUsername(), new GuestDTO(g.getUsername(),g.getRentedApartments(),g.getReservations()));
		}
		GuestDTO newGuestDTO = new GuestDTO(guest.getUsername(), guest.getRentedApartments(),guest.getReservations());
		genericCRUD.update(guestsDTO,newGuestDTO, path, guest.getUsername());
		guests.replace(guest.getUsername(), guests.get(guest.getUsername()), guest);
	}
	
	public Collection<Guest> allGuests(){
		return guests.values();
	}
	
	
	public HashMap<String, Guest> getGuests() {
		return guests;
	}

	public void setGuests(HashMap<String, Guest> guests) {
		this.guests = guests;
	}

	public Guest find(String username, String password) {
		if (!guests.containsKey(username)) {
			return null;
		}
		Guest Guest = guests.get(username);
		if (!Guest.getPassword().equals(password)) {
			return null;
		}
		return Guest;
	}

	public void update(Collection<Guest> allGuests,String path) throws JsonGenerationException, JsonMappingException, IOException {
		Collection<GuestDTO> guestsDTO = new LinkedList<GuestDTO>();
		for (Guest guest : allGuests) {
			guestsDTO.add(new GuestDTO(guest.getUsername(),guest.getRentedApartments(),guest.getReservations()));
		}
		genericCRUD.saveAll(guestsDTO, path);
	}

}
