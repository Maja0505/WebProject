package dao;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;

import beans.User;



public class GenericCRUD<E>{
	
	public List<E> load(String path, Class<E> classType) throws JsonParseException, JsonMappingException, IOException {	
		ObjectMapper mapper = new ObjectMapper();
		CollectionType listType = mapper.getTypeFactory().constructCollectionType(ArrayList.class, classType);
		List<E> entities = mapper.readValue(new File(path), listType);
		return entities;
	}
	
	
	public void delete(E entity,String path) {}
	
	public void update(E entity,String path) {}
	
	public void saveAll(Collection<E> entities) {}
	
};
