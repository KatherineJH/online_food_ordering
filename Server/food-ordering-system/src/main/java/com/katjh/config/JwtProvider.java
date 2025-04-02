package com.katjh.config;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

// JWT(JSON Web Token)를 생성하고 검증
@Service
public class JwtProvider {

    //    private SecretKey key = Keys.hmacShaKeyFor(JwtConctant.SECRET_KEY.getBytes());

    // JwtTokenValidator 에서도 사용하는 key 반환 공통 메서드
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(JwtConstant.SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * JWT를 생성하는 메소드
     *
     * @param auth Authentication 객체로, 사용자 인증 정보를 포함
     * @return 생성된 JWT 문자열 → 1. 로그인 시도 (Email + Password) → 2. AuthenticationManager → 3.
     *     UserDetailsService (이메일을 기반으로 사용자 정보 조회) → 4. UsernamePasswordAuthenticationToken 생성 → 5.
     *     AuthenticationManager 인증 완료 → 6. 권한 정보 추출 (auth.getAuthorities())
     */
    public String generateToken(Authentication auth) {
        // Authentication 객체에서 권한 정보를 추출
        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
        String roles = populateAuthorities(authorities);

        // JWT를 생성하여 반환
        return Jwts.builder()
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + JwtConstant.EXPIRATION_TIME))
                .claim("email", auth.getName()) // 사용자 이메일을 "email" 클레임에 저장
                .claim("authorities", roles) // 권한 정보를 "authorities" 클레임에 저장
                .signWith(getSigningKey()) // 비밀 키로 서명
                .compact(); // JWT를 컴팩트하게 생성하여 반환
    }

    /**
     * 권한 정보를 문자열로 변환하는 메소드
     *
     * @param authorities 권한 리스트
     * @return 권한을 콤마로 구분한 문자열
     */
    private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
        Set<String> auths = new HashSet<>();
        for (GrantedAuthority authority : authorities) {
            auths.add(authority.getAuthority());
        }
        // Set에 저장된 권한들을 콤마로 구분하여 하나의 문자열로 반환
        return String.join(",", auths);
    }

    /**
     * JWT에서 이메일을 추출하는 메소드
     *
     * @param jwt JWT 문자열
     * @return JWT에서 추출한 이메일
     */
    public String getEmailFromJwtToken(String jwt) {
        jwt = jwt.substring(7);
        Claims claims =
                Jwts.parser()
                        .verifyWith(this.getSigningKey()) // 서명 검증
                        .build()
                        .parseSignedClaims(jwt)
                        .getPayload();
        // "email" 클레임에서 이메일 정보 추출하여 반환
        return String.valueOf(claims.get("email"));
    }
}
