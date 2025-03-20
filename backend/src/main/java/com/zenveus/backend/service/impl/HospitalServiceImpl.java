package com.zenveus.backend.service.impl;

import com.zenveus.backend.dto.HospitalDTO;
import com.zenveus.backend.entity.Hospital;
import com.zenveus.backend.repository.HospitalRepository;
import com.zenveus.backend.service.HospitalService;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HospitalServiceImpl implements HospitalService {


    private final HospitalRepository hospitalRepository;
    private final RestTemplate restTemplate;
    private final ModelMapper modelMapper;


    @Autowired
    public HospitalServiceImpl(HospitalRepository hospitalRepository, ModelMapper modelMapper) {
        this.hospitalRepository = hospitalRepository;
        this.modelMapper = modelMapper;
        this.restTemplate = new RestTemplate();
    }


    public void fetchAndSaveHospitals() {

        try{
            String url = "https://nominatim.openstreetmap.org/search?country=Sri%20Lanka&amenity=hospital&format=json&limit=50";

            String response = restTemplate.getForObject(url, String.class);
            JSONArray hospitalsArray = null;
            try {
                hospitalsArray = new JSONArray(response);
            } catch (JSONException e) {
                throw new RuntimeException(e);
            }
            List<Hospital> hospitalList = new ArrayList<>();

            for (int i = 0; i < hospitalsArray.length(); i++) {
                JSONObject obj = null;
                try {
                    obj = hospitalsArray.getJSONObject(i);
                } catch (JSONException e) {
                    throw new RuntimeException(e);
                }
                String name = obj.optString("display_name", "Unknown Hospital");
                String lat = obj.optString("lat", "0");
                String lon = obj.optString("lon", "0");

                Hospital hospital = new Hospital(name, lat, lon);
                hospitalList.add(hospital);
            }

            // Save all hospitals in the database
            hospitalRepository.saveAll(hospitalList);
        }catch (Exception e){
            System.out.println(e);
            throw new RuntimeException(e);

        }

    }

    @Override
    public List<HospitalDTO> getHospitals() {
        return hospitalRepository.findAll().stream()
                .map(hospital -> modelMapper.map(hospital, HospitalDTO.class))
                .collect(Collectors.toList());
    }
}

