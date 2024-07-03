<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="userModal"
    tabindex="-1"
    aria-labelledby="userModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="userModalLabel">登入/註冊會員</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>立即登入，隨時收到獨家優惠</p>
          <form>
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">電子郵件</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">密碼</label>
            </div>
            <a href="/forgetpassword" class="float-end">忘記密碼</a>
            <button type="submit" class="btn btn-primary form-control">登入</button>
            <a href="/register">還未加入我們嗎？立即註冊！</a>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="cartModal"
    tabindex="-1"
    aria-labelledby="cartModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">您的購物車是空的</div>
        <div class="modal-footer">
          <p>共 0 件商品</p>
          <button type="button" class="btn btn-primary">查看購物車</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
