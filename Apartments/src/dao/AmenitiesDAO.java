package dao;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import beans.Amenities;

public class AmenitiesDAO {

	private HashMap<String, Amenities> amenities;
	private GenericCRUD<Amenities> genericCRUD = new GenericCRUD<Amenities>();
	
	public AmenitiesDAO() {
		
	}
	
	public AmenitiesDAO(String contexPath) throws JsonParseException, JsonMappingException, IOException {
		amenities = new HashMap<String, Amenities>();
		List<Amenities> amenitiesArray = genericCRUD.load(contexPath, Amenities.class);
		for(Amenities a : amenitiesArray) {
			amenities.put(String.valueOf(a.getId()), a);
		}
	}
	
	public Collection<Amenities> allAmenities(){
		return amenities.values();
	}
	
	public void save(Collection<Amenities> allAmenities,Amenities newAmenitie,String path) throws JsonGenerationException, JsonMappingException, IOException {
		genericCRUD.saveAll(allAmenities, path);
		amenities.put(String.valueOf(newAmenitie.getId()), newAmenitie);
	}
	
	public HashMap<String, Amenities> getAmenities() {
		return amenities;
	}
	public void setAmenities(HashMap<String, Amenities> amenities) {
		this.amenities = amenities;
	}
	public GenericCRUD<Amenities> getGenericCRUD() {
		return genericCRUD;
	}
	public void setGenericCRUD(GenericCRUD<Amenities> genericCRUD) {
		this.genericCRUD = genericCRUD;
	}

	public void update(Amenities amenitie, String path) throws JsonGenerationException, JsonMappingException, IOException {
		genericCRUD.update(amenities, amenitie, path, amenitie.getId());
		amenities.replace(amenitie.getId(), amenities.get(amenitie.getId()), amenitie);
		
	}
	
	
}
