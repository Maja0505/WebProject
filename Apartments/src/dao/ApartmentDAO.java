package dao;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import beans.Apartment;

public class ApartmentDAO {

	private HashMap<String,Apartment> apartments;
	private GenericCRUD<Apartment> genericCRUD = new GenericCRUD<Apartment>();
	
	public ApartmentDAO() {
	}

	public ApartmentDAO(String contexPath) throws JsonParseException, JsonMappingException, IOException {
		apartments = new HashMap<String, Apartment>();
		List<Apartment> aparmtentsArray = genericCRUD.load(contexPath, Apartment.class);
		for(Apartment apartment : aparmtentsArray) {
			apartments.put(String.valueOf( apartment.getId()),apartment);
		}
	}
	
	public void save(Apartment newAparmtnet,String path) throws JsonGenerationException, JsonMappingException, IOException {
		apartments.put(String.valueOf(newAparmtnet.getId()),newAparmtnet);
		genericCRUD.saveAll(allAparmtents(),path);
	}
	
	public void update(Apartment apartment,String path) throws JsonGenerationException, JsonMappingException, IOException {
		genericCRUD.update(apartments, apartment, path, String.valueOf(apartment.getId()));
		apartments.replace(String.valueOf(apartment.getId()), apartments.get(String.valueOf(apartment.getId())), apartment);
	}
	
	public void updateAllApartments(List<Apartment> allApartments,String path) throws JsonGenerationException, JsonMappingException, IOException {
		genericCRUD.saveAll(allApartments, path);
		for (Apartment a : allApartments) {
			apartments.replace(String.valueOf(a.getId()), apartments.get(String.valueOf(a.getId())), a);
		}
	}
	
	public Collection<Apartment> allAparmtents() {
		return apartments.values();
	}
	

	public HashMap<String, Apartment> getApartments() {
		return apartments;
	}

	public void setApartments(HashMap<String, Apartment> apartments) {
		this.apartments = apartments;
	}

	public GenericCRUD<Apartment> getGenericCRUD() {
		return genericCRUD;
	}

	public void setGenericCRUD(GenericCRUD<Apartment> genericCRUD) {
		this.genericCRUD = genericCRUD;
	}

	

}
