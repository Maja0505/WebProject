package dao;

import java.io.File;
import java.io.IOException;
import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;



public class GenericCRUD<E>{
	
	public Collection<E> load(String path) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		List<E> entities = objectMapper.readValue(new File(path), new TypeReference<List<E>>(){});		
		return (Collection<E>) entities;
	}
	
	
	public void delete(E entity,String path) {}
	
	public void update(E entity,String path) {}
	
	public void saveAll(Collection<E> entities) {}
	
};
