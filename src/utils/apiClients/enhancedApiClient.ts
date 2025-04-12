import { request, type APIRequestContext, type APIResponse } from '@playwright/test';
import { logger } from '../report/logger';

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any> | string | FormData;
  failOnStatusCode?: boolean;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export class EnhancedApiClient {
  private context!: APIRequestContext;
  private baseUrl: string;
  private defaultOptions: RequestOptions = {
    failOnStatusCode: false,
    timeout: 30000,
    retries: 0,
    retryDelay: 1000,
  };

  constructor(baseUrl: string, defaultHeaders?: Record<string, string>) {
    this.baseUrl = baseUrl;
    this.initialize(defaultHeaders).catch(error => {
      logger.error(`Failed to initialize API client: ${error instanceof Error ? error.message : String(error)}`);
    });
  }

  private async initialize(defaultHeaders?: Record<string, string>): Promise<void> {
    this.context = await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: defaultHeaders,
    });
  }

  /**
   * Sends a GET request to the specified endpoint
   */
  public async get(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<APIResponse> {
    const mergedOptions = { ...this.defaultOptions, ...options };
    return this.sendRequest('GET', endpoint, mergedOptions);
  }

  /**
   * Sends a POST request to the specified endpoint
   */
  public async post(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<APIResponse> {
    const mergedOptions = { ...this.defaultOptions, ...options };
    return this.sendRequest('POST', endpoint, mergedOptions);
  }

  /**
   * Sends a PUT request to the specified endpoint
   */
  public async put(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<APIResponse> {
    const mergedOptions = { ...this.defaultOptions, ...options };
    return this.sendRequest('PUT', endpoint, mergedOptions);
  }

  /**
   * Sends a PATCH request to the specified endpoint
   */
  public async patch(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<APIResponse> {
    const mergedOptions = { ...this.defaultOptions, ...options };
    return this.sendRequest('PATCH', endpoint, mergedOptions);
  }

  /**
   * Sends a DELETE request to the specified endpoint
   */
  public async delete(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<APIResponse> {
    const mergedOptions = { ...this.defaultOptions, ...options };
    return this.sendRequest('DELETE', endpoint, mergedOptions);
  }

  /**
   * Sends an HTTP request with retries and logging
   */
  private async sendRequest(
    method: string,
    endpoint: string,
    options: RequestOptions
  ): Promise<APIResponse> {
    const { retries = 0, retryDelay = 1000, ...requestOptions } = options;
    const url = this.resolveUrl(endpoint);
    
    logger.debug(
      `[API] ${method} ${url} - Request: ${
        options.data ? JSON.stringify(options.data) : '(no body)'
      }`
    );

    let lastError = new Error('Unknown error occurred');
    let attempts = 0;
    const maxAttempts = retries + 1;

    while (attempts < maxAttempts) {
      attempts++;
      try {
        const response = await this.executeRequest(method, endpoint, requestOptions);
        
        // Log response details
        const status = response.status();
        const statusText = response.statusText();
        const isJson = response.headers()['content-type']?.includes('application/json');
        
        let responseBody = '';
        try {
          if (isJson) {
            responseBody = JSON.stringify(await response.json());
          } else {
            responseBody = await response.text();
          }
        } catch {
          // Error parsing response body, ignore the error itself
          responseBody = '(failed to parse response body)';
        }

        logger.debug(
          `[API] ${method} ${url} - Response: ${status} ${statusText} - ${responseBody.substring(0, 1000)}${
            responseBody.length > 1000 ? '... (truncated)' : ''
          }`
        );

        if (
          !options.failOnStatusCode || 
          (status >= 200 && status <= 299)
        ) {
          return response;
        }

        throw new Error(`Request failed with status ${status}: ${statusText}`);
      } catch (error: unknown) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempts >= maxAttempts) {
          logger.error(`[API] ${method} ${url} - Failed after ${attempts} attempts: ${lastError.message}`);
          throw lastError;
        }
        
        logger.warn(
          `[API] ${method} ${url} - Attempt ${attempts}/${maxAttempts} failed: ${
            lastError.message
          }. Retrying in ${retryDelay}ms...`
        );
        
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }

    // This should never happen, but TypeScript requires it
    throw lastError;
  }

  /**
   * Executes a single request attempt
   */
  private async executeRequest(
    method: string,
    endpoint: string,
    options: Omit<RequestOptions, 'retries' | 'retryDelay'>
  ): Promise<APIResponse> {
    const { headers, params, data, ...restOptions } = options;
    
    // Build the URL with query parameters
    let url = endpoint;
    if (params && Object.keys(params).length > 0) {
      const queryParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        queryParams.append(key, String(value));
      }
      url = `${endpoint}?${queryParams.toString()}`;
    }

    // Execute the request based on the method
    switch (method.toUpperCase()) {
      case 'GET':
        return await this.context.get(url, {
          headers,
          ...restOptions,
        });
      case 'POST':
        return await this.context.post(url, {
          headers,
          data,
          ...restOptions,
        });
      case 'PUT':
        return await this.context.put(url, {
          headers,
          data,
          ...restOptions,
        });
      case 'PATCH':
        return await this.context.patch(url, {
          headers,
          data,
          ...restOptions,
        });
      case 'DELETE':
        return await this.context.delete(url, {
          headers,
          data,
          ...restOptions,
        });
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }

  /**
   * Resolves the full URL from an endpoint
   */
  private resolveUrl(endpoint: string): string {
    if (endpoint.startsWith('http')) {
      return endpoint;
    }
    
    // Ensure exactly one slash between base URL and endpoint
    const baseWithTrailingSlash = this.baseUrl.endsWith('/')
      ? this.baseUrl
      : `${this.baseUrl}/`;
      
    const endpointWithoutLeadingSlash = endpoint.startsWith('/')
      ? endpoint.substring(1)
      : endpoint;
      
    return `${baseWithTrailingSlash}${endpointWithoutLeadingSlash}`;
  }

  /**
   * Closes the API context
   */
  public async close(): Promise<void> {
    await this.context.dispose();
  }
}

/**
 * Creates an enhanced API client with the given base URL and default headers
 */
export function createApiClient(
  baseUrl: string,
  defaultHeaders?: Record<string, string>
): EnhancedApiClient {
  return new EnhancedApiClient(baseUrl, defaultHeaders);
} 