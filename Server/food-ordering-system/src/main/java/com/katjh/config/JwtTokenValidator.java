package com.katjh.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

/**
 * JWT 토큰 유효성 검사 필터(doFilterInternal)
 * : doFilterInternal 메서드가 호출되면서 HTTP 요청이 수신 및 필터링
 * 1. JWT 토큰 검증
 * 2. JWT 토큰 추출
 * 3. SecurityContext에 인증된 사용자 설정
 * */
public class JwtTokenValidator extends OncePerRequestFilter {

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(JwtConctant.SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        /**
         * 클라이언트가 요청을 보낼 때 다음과 같이 Authorization 헤더를 설정했다면:
         * Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
         * 예시 코드(React):
         * export const getHeader = () => {
         *   const token = localStorage.getItem("token");
         *   return {
         *     Authorization: `Bearer ${token}`,
         *     "Content-Type": "application/json",
         *   };
         * };
         * Server side 에서, jwt 변수에 할당되는 값은:
         * String jwt = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
         * */
        String jwt = request.getHeader(JwtConctant.JWT_HEADER);// request.getHeader("Authorization") => get jwt from header

        // Bearer Token
        if(jwt != null && jwt.startsWith("Bearer ")){
            jwt = jwt.substring(7); // remove "Bearer " from jwt
            System.out.println("JWT Token: " + jwt);
            try{
                // JWT를 파싱하고 서명 키로 검증하여 Claims 객체로 변환
                Claims claims = Jwts
                        .parser()
                        .verifyWith(this.getSigningKey())
                        .build()
                        .parseSignedClaims(jwt)
                        .getPayload();
                // JWT에서 이메일 및 권한 정보 가져오기
                String email = String.valueOf(claims.get("email"));
                String authorities = String.valueOf(claims.get("authorities")); // authorities = "ROLE_USER, ROLE_ADMIN" 와 같이 하나 이상의 값

                // ROLE_USER, ROLE_ADMIN
                /**
                 * 유저의 권한이 여러 개라면,
                 * [
                 *     GrantedAuthority { role = "ROLE_USER" },
                 *     GrantedAuthority { role = "ROLE_ADMIN" }
                 * ]
                 * auth = [ROLE_USER, ROLE_ADMIN] 와 같이 리스트 형식
                 * */
                List<GrantedAuthority> auth = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
                // Authentication 객체 생성
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auth); // null -> 비밀번호는 JWT 인증에서는 필요하지 않음
                // authenticated user set in SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e) {
                throw new BadCredentialsException("invalid token.......");
            }
        }
        filterChain.doFilter(request, response);
    }

}
